import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { EnglishFlashcard } from "../../database";
import {  EnglishFlashcardDto, EnglishFlashCardStateEnum } from "../../dtos";
import { Fm2AlgorithmDto } from "../../_shared";

class GetOneDto {
    _id: Types.ObjectId;
    vocabularyId: Types.ObjectId;
    cardType: string;
    sm2: {
        state: string
    };
    vocabulary: {
        word: string;
        definition: string;
        ipa: string;
        translation: string;
        level: string;
        category: string;
        usageNote: string;
    }
}

@Injectable()
export class EnglishFlashcardsRepository {
    constructor(
        @InjectModel(EnglishFlashcard.name) private readonly model: Model<EnglishFlashcard>
    ) { }

    create(vocabId: string, userId: string, flashcard: EnglishFlashcardDto) {
        this.model.create({
            _id: new Types.ObjectId(),
            vocabularyId: new Types.ObjectId(vocabId),
            userId: new Types.ObjectId(userId),
            ...flashcard
        })
    }


    updateSm2(flashcardId: Types.ObjectId, sm2: Fm2AlgorithmDto) {
        return this.model.findByIdAndUpdate(flashcardId, { sm2: sm2})
    }

    findById(_id: string) {
        return this.model.findById(new Types.ObjectId(_id))
    }

    async getFlashcard(userId: string): Promise<GetOneDto> {
        const raw = await this.model.aggregate([
            {
                $match: {
                    userId: new Types.ObjectId(userId),
                    "sm2.nextReview": { $lte: new Date()},
                    "sm2.state": {$ne: EnglishFlashCardStateEnum.MEMORIZED}
                }
            },
            {
                $lookup: {
                    from: "englishdictionaries",
                    localField: "vocabularyId",
                    foreignField: "_id",
                    as: "vocabulary"
                }
            },
            {
                // 3. Unwind để wordInfo thành object thay vì array
                $unwind: "$vocabulary"
            },
            {
                // 4. (Tuỳ chọn) Chỉ lấy field cần thiết
                $project: {
                    _id: 1,
                    vocabularyId: 1,
                    "sm2.state": 1,
                    "vocabulary.word": 1,
                    "vocabulary.translation": 1,
                    "vocabulary.ipa": 1,
                    "vocabulary.definition": 1,
                    "vocabulary.usageNote": 1,
                    "vocabulary.level": 1,
                    "vocabulary.category": 1,
                }
            }
        ])

        return raw[0]
    }
}