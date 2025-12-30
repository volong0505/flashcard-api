import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { EnglishDictionaryDto } from '../../dtos'
export type EnglishDictionaryDocument = HydratedDocument<EnglishDictionary>;

@Schema({})
export class EnglishDictionary implements EnglishDictionaryDto {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    userId: Types.ObjectId;

    @Prop()
    word: string;

    @Prop()
    translation: string;

    @Prop()
    ipa: string;

    @Prop()
    definition: string;

    @Prop()
    usageNote: string;

    @Prop()
    level: string;

    @Prop()
    category: string; // part of speech and more: idiom, structure .v.v

    @Prop()
    createDate: Date;

    @Prop()
    updateDate: Date

    @Prop()
    deleteDate: Date
}

export const EnglishDictionarySchema = SchemaFactory.createForClass(EnglishDictionary)