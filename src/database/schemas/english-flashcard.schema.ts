import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Fm2AlgorithmDto, FlashcardHistoryDto } from "src/_shared";
import { EnglishFlashcardDto } from "../../dtos";

export type EnglishFlashcardDocument = HydratedDocument<EnglishFlashcard>;

@Schema({})
class EnglishFlashcardFm2Schema implements Fm2AlgorithmDto {
    @Prop()
    easeFactor: number;
    @Prop()
    interval: number;
    @Prop()
    repetition: number;
    @Prop()
    state: string;
    @Prop()
    nextReview: Date;
}

@Schema({})
class FlashcardHistorySchema implements FlashcardHistoryDto {
    @Prop()
    date: Date;
    @Prop()
    quality: number;
    @Prop()   
    responseTime: number;
}

@Schema({})
export class EnglishFlashcard implements EnglishFlashcardDto {

    @Prop()
    _id: Types.ObjectId;

    @Prop({required: true, index: true})
    vocabularyId: Types.ObjectId;

    @Prop({required: true, index: true})
    userId: Types.ObjectId;

    @Prop()
    cardType: string;

    @Prop({type: EnglishFlashcardFm2Schema})
    sm2: EnglishFlashcardFm2Schema;

    @Prop({type: [FlashcardHistorySchema]})
    history: FlashcardHistorySchema[];
}

export const EnglishFlashcardSchema = SchemaFactory.createForClass(EnglishFlashcard)