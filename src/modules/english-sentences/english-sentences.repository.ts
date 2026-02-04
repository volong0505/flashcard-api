import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EnglishSentence } from "src/database";
import { EnglishSentenceCreateDto, EnglishSentenceUpdateDto, GetSentenceFlashcardRequest } from '../../dtos';

@Injectable()
export class EnglishSentencesRepository {
    constructor(@InjectModel(EnglishSentence.name) private readonly model: Model<EnglishSentence>
    ) { }

    create(dto: EnglishSentenceCreateDto, userId: string) {
        const create = {
            _id: new Types.ObjectId(),
            userId: new Types.ObjectId(userId),
            translation: dto.translation,
            sentence: dto.sentence,
            wordIds: dto.wordIds.map(e => new Types.ObjectId(e)),
            createDate: new Date()
        }

        return this.model.create(create)
    }

    update(dto: EnglishSentenceUpdateDto, userId: string) {
        const value = dto.update.key == 'wordIds' ? (dto.update.value as string[]).map(e => new Types.ObjectId(e)) : dto.update.value;

        const updateField = { [dto.update.key]: value }
        return this.model.findOneAndUpdate({ _id: new Types.ObjectId(dto._id), userId: new Types.ObjectId(userId) }, { ...updateField, updateDate: new Date() })
    }

    findAll(req) {

        const { userId, keyword, page = 1, sortField, sortOrder } = req;

        const limit = 12; // Number of items per page 

        let query = this.model.aggregate([
            ...(keyword ? [{
                $match: {
                    $or: [
                        { sentence: { $regex: keyword, $options: 'i' } },
                    ]
                }
            }] : []),

            {
                // 1. Join với bảng words
                $lookup: {
                    from: "englishdictionaries",
                    localField: "wordIds",
                    foreignField: "_id",
                    as: "wordDetails"
                }
            },
            // 2. Sắp xếp kết quả (tùy chọn - nên có để phân trang ổn định)
            { $sort: { "createDate": -1 } },

            // 3. Phân trang
            { $skip: (page - 1) * limit }, // Bỏ qua các bản ghi của các trang trước
            { $limit: limit }                    // Giới hạn số lượng bản ghi trả về
        ]);

        if (keyword) {
            query['$or'] = [
                { word: { $regex: keyword, $options: 'i' } },
                { translation: { $regex: keyword, $options: 'i' } }
            ]
        }

        return query.exec();
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

    async nextSentence(dto: GetSentenceFlashcardRequest) {
        let query = this.model.find({ wordIds: new Types.ObjectId(dto.wordId) }).limit(1);
        query = query.sort({
            "progress.repetition": 'asc',
        })
        const result = await query.exec();
        return result[0]
    }

    updateProgress(_id: string) {
        let query = this.model.updateOne({
            _id: new Types.ObjectId(_id),
        },
            {
                $inc: { "progress.repetition": 1 },
                "progress.date": new Date()
            })

        return query.exec()
    }

    findByWordIs(wordId: string, usedId: string) {
        return this.model.find({ wordIds: new Types.ObjectId(wordId), userId: new Types.ObjectId(usedId) })
    }
}