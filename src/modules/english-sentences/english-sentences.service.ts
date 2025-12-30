import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { EnglishSentenceCreateDto, EnglishSentenceItemDto, EnglishSentenceListRequest, EnglishSentenceListResponse, EnglishSentenceUpdateDto, GetSentenceFlashcardResponse, GetSentenceFlashcardRequest } from '../../dtos';
import { EnglishSentencesRepository } from './english-sentences.repository';

@Injectable()
export class EnglishSentencesService {
    constructor(
        private readonly repository: EnglishSentencesRepository,
        private readonly authService: AuthService
    ) { }

    async findAll(query: EnglishSentenceListRequest, req): Promise<EnglishSentenceListResponse> {
        
        const userId = await this.getUserId(req)
        const params = {
            sortField: 'createDate',
            userId,
            sortOrder: 'desc',
            keyword: query.keyword || '',
            page: query.page,
        }

        const [rawData, total] = await Promise.all([
            this.repository.findAll(params),
            this.repository.countTotal(params)
        ])

        const list: EnglishSentenceItemDto[] = rawData.map(item => ({
            _id: item._id.toString(),
            sentence: item.sentence,
            translation: item.translation,
            words: item.words
        }));
        // Return the Word list
        return {
            list,
            total
        };
    }

    async create(dto: EnglishSentenceCreateDto, req) {
        const userId = await this.getUserId(req)
        const newSentence = await this.repository.create(dto, userId);
        return newSentence
    }

    async update(dto: EnglishSentenceUpdateDto, req) {
        const userId = await this.getUserId(req);
        
        const sentence = await this.repository.update(dto, userId);
        return sentence
    }

    async getUserId(req) {
        const cookie = req.cookies['access_token'];
        const { user } = await this.authService.verifyToken(cookie);
        return user._id
    }

    async getNextSentence(dto: GetSentenceFlashcardRequest): Promise<GetSentenceFlashcardResponse> {
        const result = await this.repository.nextSentence(dto);
        if (!result) return {} as GetSentenceFlashcardResponse;
        return {
            _id: result._id.toString(),
            sentence: result.sentence,
            translation: result.translation,
            words: result.words
        }
    }

    async updateSentenceFlashcard(_id: string, userId: string) {
        return await this.repository.updateProgress(_id, userId)
    }
}
