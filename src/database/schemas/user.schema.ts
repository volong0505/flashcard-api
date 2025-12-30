import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
class UserProfile{
    @Prop()
    username: string;

    @Prop()
    email: string;
}

class UserAuthProvider {
    local: {
        email: string;
        hashedPassword: string;
        verified: boolean
    };
    google: {
        id: string;
        email: string
    };
    facebook: {
        id: string;
        email: string
    }
}

@Schema()
export class User{
    @Prop()
    _id: Types.ObjectId;
    
    @Prop()
    profile: UserProfile;

    @Prop()
    authProvider: UserAuthProvider;

    @Prop()
    isOnline: boolean;

    @Prop()
    createAt: Date 
}

export const UserSchema = SchemaFactory.createForClass(User)