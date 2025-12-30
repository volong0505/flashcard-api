import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EnglishSentence } from "src/database";
import { EnglishSentenceCreateDto, EnglishSentenceUpdateDto, GetSentenceFlashcardRequest} from '../../dtos';

@Injectable()
export class EnglishSentencesRepository {
    constructor(@InjectModel(EnglishSentence.name) private readonly model: Model<EnglishSentence>
    ) { }

    create(dto: EnglishSentenceCreateDto, userId: string) {
        const newWord = {
            _id: new Types.ObjectId(),
            userId: new Types.ObjectId(userId),
            translation: dto.translation,
            sentence: dto.sentence,
            words: dto.words,
            createDate: new Date()
        }
        return this.model.create(newWord)
    }

    update(dto: EnglishSentenceUpdateDto, userId: string) {
        return this.model.findOneAndUpdate({_id: new Types.ObjectId(dto._id), userId: new Types.ObjectId(userId)}, {...dto.update, updateDate: new Date()})
    }

    findAll(req): Promise<EnglishSentence[]> {

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
        let query = this.model.find({userId: new Types.ObjectId(dto.userId) }).limit(1);
        query = query.sort({
            "progress.date": 'asc',
        })
        const result = await query.exec();
        return result[0]
    }

    updateProgress(_id: string, userId: string) {
        let query = this.model.updateOne({
            _id: new Types.ObjectId(_id),
            userId: new Types.ObjectId(userId),
        },
        {
            $inc: { "progress.repetition": 1 },
            "progress.date": new Date()
        })

        return query.exec()
    }
}