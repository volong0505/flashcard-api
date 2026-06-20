import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SvenskaDictionaryDto } from "../../../dtos";

@Schema({})
export class SvenskaDictionary implements SvenskaDictionaryDto {
    @Prop()
    word: string;

    @Prop()
    translation: string;

    @Prop()
    definition: string;

    @Prop()
    usageNote: string;

    @Prop()
    createDate: string;

    @Prop()
    updateDate: string;

    @Prop()
    deleteDate: string;
}

export const SvenskaDictionarySchema = SchemaFactory.createForClass(SvenskaDictionary)