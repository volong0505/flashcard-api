import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EnglishStructure } from "src/database/schemas/english-structure.schema";

@Injectable()
export class EnglishStructuresRepository {
    constructor(@InjectModel(EnglishStructure.name) private readonly model: Model<EnglishStructure>) { }

    create(dto: any, userId: string) {
        const create = {
            _id: new Types.ObjectId(),
            userId: new Types.ObjectId(userId),
            description: dto.description,
            structure: dto.structure,
            createDate: new Date()
        }
        return this.model.create(create)
    }

    getAll(req: any) {
        const { userId } = req;

        return this.model.find({ userId: new Types.ObjectId(userId)})
    }
}