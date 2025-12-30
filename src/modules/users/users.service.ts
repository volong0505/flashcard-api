import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/database';
import { createUserDto, getUser } from '../../dtos';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private readonly model: Model<User>
    ){ }
    
    create(req: createUserDto) {
            const user = {
            _id: new Types.ObjectId(),
            profile: {
                email: req.email,
                username: req.username
            },
            authProvider: {
                local: {
                    email: req.email,
                    hashedPassword: req.hashedPassword,
                    verified: false
                },
                facebook: {},
                google: {}
            },
            createDate: new Date()
        }

        return this.model.create(user)
    }

    getUser(req: getUser): Promise<any> {
        return this.model.findOne({"profile.email": req.email})
    }

}
