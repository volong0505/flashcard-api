import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { FlashcardHistoryDto, Fm2AlgorithmDto } from "../../../_shared";

export type SvenskaFlashcardDocument = HydratedDocument<SvenskaFlashcard>

@Schema({})
class SvenskaFlashcardFm2Schema implements Fm2AlgorithmDto {
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
export class SvenskaFlashcard {

    @Prop()
    _id: Types.ObjectId;

    @Prop({required: true, index: true})
    vocabularyId: Types.ObjectId;

    @Prop({required: true, index: true})
    userId: Types.ObjectId;

    @Prop()
    cardType: string;

    @Prop({type: SvenskaFlashcardFm2Schema})
    sm2: SvenskaFlashcardFm2Schema;

    @Prop({type: [FlashcardHistorySchema]})
    history: FlashcardHistorySchema[];

    @Prop()
    lastReview: Date;
}

export const SvenskaFlashcardSchema = SchemaFactory.createForClass(SvenskaFlashcard)
