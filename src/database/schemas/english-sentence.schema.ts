import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { EnglishSenteceProgressDto, EnglishSentenceDto } from "src/dtos";

export type EnglishSentenceDocument = HydratedDocument<EnglishSentence>;

@Schema({})
export class EnglishSentence {
    @Prop()
    _id: Types.ObjectId;

    @Prop()
    userId: Types.ObjectId;

    @Prop()
    sentence: string;

    @Prop()
    translation: string;

    @Prop()
    wordIds: Types.ObjectId[];

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