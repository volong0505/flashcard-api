import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { addDays } from 'date-fns';
import {compare, hash} from 'bcrypt';
import { AuthSignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) {
        // this.register({email: 'volong0505@gmail.com', password: "123456", username: 'volong' })
    }

    async signIn(email: string, password: string, res): Promise<any> {
        const user = await this.userService.getUser({email})
        if (!user) throw new UnauthorizedException();

        const isMatched = await compare(password, user.authProvider.local.hashedPassword);
        if (!isMatched) {
            throw new UnauthorizedException();
        }

        const payload = { user: user};
        delete user.authProvider.hashedPassword;
        const accessToken = this.jwtService.sign(payload);
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            expires: addDays(new Date(), + 1)
        });
        return {
            message: 'Login Successfully'
        }
    }

    async register(req: AuthSignUpDto): Promise<any> {
        const hashedPassword = await hash(req.password, 10);
        const createUser = {
            email: req.email,
            username: req.username,
            hashedPassword
        } 
        return await this.userService.create(createUser)
    }

     async verifyToken(cookie: string) {
    return await this.jwtService.verifyAsync(cookie);
  }
}
