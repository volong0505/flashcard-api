import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type SvenskaSentenceDocument = HydratedDocument<SvenskaSentence>;

@Schema({})
export class SvenskaSentence {
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
    createDate: Date;

    @Prop()
    updateDate: Date

    @Prop()
    deleteDate: Date
}

export const SvenskaSentenceSchema = SchemaFactory.createForClass(SvenskaSentence)