import { Injectable } from '@nestjs/common';
import { SvenskaSentenceRepository } from './svenska-sentence.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SvenskaSentenceService {
      constructor(
            private readonly repository: SvenskaSentenceRepository,
            private readonly authService: AuthService
        ) { }
    
        async findAll(query: any, req): Promise<any> {
            
            const userId = await this.getUserId(req)
            const params = {
                sortField: 'progress.date',
                userId,
                sortOrder: 'asc',
                keyword: query.keyword || '',
                page: query.page,
            }
    
            const [rawData, total] = await Promise.all([
                this.repository.findAll(params),
                this.repository.countTotal(params)
            ])
    
            const list: any[] = rawData.map(item => ({
                _id: item._id.toString(),
                sentence: item.sentence,
                translation: item.translation,
                words: item.wordDetails.map(e => ({
                    _id: e._id.toString(),
                    word: e.word,
                    translation: e.translation
                }))
            }));
            // Return the Word list
            return {
                list,
                total
            };
        }
    
        async create(dto: any, req) {
            const userId = await this.getUserId(req)
            const newSentence = await this.repository.create(dto, userId);
            return newSentence
        }
    
        async update(dto: any, req) {
            const forbiddenSet = new Set(['sentence', 'translation', 'wordIds']);
    
            const userId = await this.getUserId(req);
            if (!forbiddenSet.has(dto.update.key)) return
            const sentence = await this.repository.update(dto, userId);
            return sentence
        }
    
        async getUserId(req) {
            const cookie = req.cookies['access_token'];
            const { user } = await this.authService.verifyToken(cookie);
            return user._id
        }
    
        async getNextSentence(dto: any): Promise<any> {
            const result = await this.repository.nextSentence(dto);
            if (!result) return {} as any;
            return {
                _id: result._id.toString(),
                sentence: result.sentence,
                translation: result.translation,
            }
        }
    
        async getSentencesByWordId(wordId: string, usedId: string): Promise<any[]> {
            const raw = await this.repository.findByWordIs(wordId, usedId);
            return raw.map(e => ({
                _id: e._id.toString(),
                sentence: e.sentence,
                translation: e.translation,
            }))
        }
    
        async updateSentenceFlashcard(_id: string) {
            return await this.repository.updateProgress(_id)
        }
}
