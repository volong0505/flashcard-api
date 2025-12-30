import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { EnglishSenteceProgressDto, EnglishSentenceDto } from "src/dtos";

export type EnglishSentenceDocument = HydratedDocument<EnglishSentence>;

@Schema({})
export class EnglishSentence implements EnglishSentenceDto {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    userId: Types.ObjectId;

    @Prop()
    sentence: string;

    @Prop()
    translation: string;

    @Prop()
    words: string[];

    @Prop()
    progress: EnglishSenteceProgressDto;

    @Prop()
    createDate: Date;

    @Prop()
    updateDate: Date

    @Prop()
    deleteDate: Date
}

export const EnglishSentenceSchema = SchemaFactory.createForClass(EnglishSentence)