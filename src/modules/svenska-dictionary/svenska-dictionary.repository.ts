import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SvenskaDictionary } from "../../database/schemas/svenska";
import { Model, Types } from "mongoose";

@Injectable()
export class SvenskaDictionaryRepository {
    constructor(
          @InjectModel(SvenskaDictionary.name) private readonly model: Model<SvenskaDictionary>
    ) {}

    create(dto: any, userId: string) {
        return this.model.create(dto)
    }

      findAll(req): Promise<any[]> {

        const { userId, keyword, page = 1, sortField = 'createDate', sortOrder} = req;

        const limit = 12; // Number of items per page 

        const conditions: any = {
            userId: new Types.ObjectId(userId),
        }

        if (keyword) {
            conditions['$or'] = [
                { word: { $regex: keyword, $options: 'i' } },
                { translation: { $regex: keyword, $options: 'i' } }
            ]
        }

        let query = this.model.find(conditions);

        if (sortField && sortOrder) {
            const orderValue = sortOrder === 'desc' || sortOrder === '-1' ? -1 : 1;
            query = query.sort({ [sortField]: orderValue });
        }
        query = query.skip((page - 1) * limit).limit(limit);
        return query.find().exec();
    }

     async findOne(wordId: string): Promise<any> {
            const raw = await this.model.aggregate([
                {
                    $match: {
                        _id: new Types.ObjectId(wordId)
                    }
                },
                {
                    $lookup: {
                        from: 'svenskaflashcards',
                        localField: '_id',
                        foreignField: 'vocabularyId',
                        as: 'flashcard'
                    }
                },
                {
                    $unwind: '$flashcard'
                }
            ])
            return raw[0]
        }
    
        async countTotal(params: any): Promise<number> {
            const { userId, keyword } = params;
    
            const conditions: any = {
                userId: new Types.ObjectId(userId),
            }
    
            if (keyword) {
                conditions['$or'] = [
                    { word: { $regex: keyword, $options: 'i' } },
                    { translation: { $regex: keyword, $options: 'i' } }
                ]
            }
    
            let query = this.model.countDocuments(conditions);
            return query.exec()
        }
    
        getOptions(keyword: string, userId: string) {
    
            const conditions: any = {
                userId: new Types.ObjectId(userId),
            }
    
            if (keyword) {
                conditions['$or'] = [
                    { word: { $regex: keyword, $options: 'i' } },
                ]
            }
    
            let query = this.model.find(conditions);
            return query.find().exec();
        }
    
        async findRelatedWords(word: string, userId): Promise<any[]>{
            const keyword = word.length > 5 ? word.slice(0, -3) : word.slice(0, 3);
    
            const conditions: any = {
                userId: new Types.ObjectId(userId),
                word: { $regex: keyword, $options: 'i', $ne: word},
            }
            return this.model.find(conditions);
        }
}
