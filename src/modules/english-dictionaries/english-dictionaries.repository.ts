import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EnglishDictionary, EnglishFlashcard, EnglishSentence } from "../../database";
import { EnglishDictionaryCreateDto} from '../../dtos';

@Injectable()
export class EnglishDictionariesRepository {
    constructor(@InjectModel(EnglishDictionary.name) private readonly model: Model<EnglishDictionary>
    ) { }

    create(dto: EnglishDictionaryCreateDto, userId: string) {
        const newWord = {
            _id: new Types.ObjectId(),
            userId: new Types.ObjectId(userId),
            word: dto.word,
            translation: dto.translation,
            definition: dto.definition,
            usageNote: dto.usageNote,
            ipa: dto.ipa,
            level: dto.level,
            topics: dto.topics,
            category: dto.category,
            createDate: new Date()
        }
        return this.model.create(newWord)
    }

    findAll(req): Promise<EnglishDictionary[]> {

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
                    from: 'englishflashcards',
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
}