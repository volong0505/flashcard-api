import { Prop, Schema, 
     SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type EnglishStrucutreDocument = HydratedDocument<EnglishStructure>;

@Schema({})
export class EnglishStructure {
    @Prop()
    _id: Types.ObjectId;
    
    @Prop()
    userId: Types.ObjectId;

    @Prop()
    structure: string;

    @Prop()
    description: string;

    @Prop()
    createDate: Date;

    @Prop()
    updateDate: Date
}

export const EnglishStructureSchema = SchemaFactory.createForClass(EnglishStructure)