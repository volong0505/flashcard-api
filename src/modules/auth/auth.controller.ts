import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Res,
    UseGuards
} from '@nestjs/common'; import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('sign-in')
    signIn(@Body() signInDto: Record<string, any>, @Res({ passthrough: true }) res: Response) {
        return this.service.signIn(signInDto.email, signInDto.password, res)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @Public()
    async getProfile(@Request() req) {
        const cookie = req.cookies['access_token'];
        const data = await this.service.verifyToken(cookie);
        return data.user
    }
}
