import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { SvenskaDictionaryRepository } from './svenska-dictionary.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SvenskaSentenceService } from '../svenska-sentence/svenska-sentence.service';
import { SVENSKA_DICTIONARY_EVENTS, SvenskaDictionaryCreatedEvent } from 'src/_shared';

@Injectable()
export class SvenskaDictionaryService {
     constructor(
            private readonly repository: SvenskaDictionaryRepository,
                    private readonly service: AuthService,
                    private readonly sentenceService: SvenskaSentenceService,
                    private eventEmitter: EventEmitter2
        ){}
        
     async findAll(query: any, req): Promise<any> {
            const cookie = req.cookies['access_token'];
            const {user} = await this.service.verifyToken(cookie);
              const params = {
                sortField: 'createDate',
                userId: user._id,
                sortOrder: 'desc',
                keyword: query.keyword || '',
                page: query.page,
            }
    
            const [rawData, total] = await Promise.all([
                this.repository.findAll(params),
                this.repository.countTotal(params)
            ])
    
            const list: any[] = rawData.map(item => ({
                _id: item._id.toString(),
                word: item.word,
                translation: item.translation,
                ipa: item.ipa,
                category: item.category,
                definition: item.definition,
                level: item.level,
                topics: item?.topics || [],
                usageNote: item.usageNote
            }));        
            // Return the Word list
            return {
                list,
                total
            };
        }
    
        async findOne(query: any, req): Promise<any> {
             const cookie = req.cookies['access_token'];
            const {user} = await this.service.verifyToken(cookie);
            const [word, sentences] = await Promise.all([
                this.repository.findOne(query._id),
                this.sentenceService.getSentencesByWordId(query._id, user._id)
            ])
    
            const relatedWords = await this.getRelatedWords(word.word, user._id)
    
            return {
                dictionary: {
                    _id: word._id.toString(),
                    word: word.word,
                    translation: word.translation,
                    definition: word.definition,
                    level: word.level,
                    category: word.category,
                    topics: word.topics,
                    usageNote: word.usageNote,
                    createAt: word.createDate,
                },
                relatedWords,
                sentences: sentences.map(e => ({
                    _id: e._id.toString(),
                    sentence:   e.sentence,
                    translation: e.translation
                })),
                flashcard: {
                    easeFactor: word.flashcard.sm2.easeFactor,
                    interval: word.flashcard.sm2.interval,
                    repetition: word.flashcard.sm2.repetition,
                    nextReview: word.flashcard.sm2.nextReview,
                    state: word.flashcard.sm2.state
                }
            }
        }
    
        async create(dto: any, req) {
            const cookie = req.cookies['access_token'];
            const {user} = await this.service.verifyToken(cookie);
            const newVocab: any = await this.repository.create(dto, user._id);
            
            this.eventEmitter.emit(
                SVENSKA_DICTIONARY_EVENTS.CREATED,
                new SvenskaDictionaryCreatedEvent(newVocab._id.toString(), user._id)
            )
           
            return newVocab
        }
    
        async getOptions(dto: any, req): Promise<any> {
            const cookie = req.cookies['access_token'];
            const {user} = await this.service.verifyToken(cookie);
    
            const raw = await this.repository.getOptions(dto.keyword, user._id);
            return {
                options: raw.map(e => ({
                    _id: e._id.toString(),
                    word: e.word,
                    translation: e.translation
                }))
            }
        }
    
        async getRelatedWords(word: string, userId: string) {
            const raw = await this.repository.findRelatedWords(word, userId);
    
            return raw.map(e => ({
                _id: e._id.toString(),
                word: e.word,
                translation: e.translation,
                category: e.category
            }))
        }
}
