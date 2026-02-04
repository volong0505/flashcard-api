import { Injectable } from '@nestjs/common';
import { EnglishDictionaryCreateDto, EnglishDictionaryDetailRequest, EnglishDictionaryDetailResponse, EnglishDictionaryGetOptionsRequest, EnglishDictionaryGetOptionsResponse, EnglishDictionaryListItemDto, EnglishDictionaryListRequest, EnglishDictionaryListResponse} from '../../dtos';
import { EnglishDictionariesRepository } from './english-dictionaries.repository';
import { AuthService } from '../auth/auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ENGLISH_DICTIONARY_EVENTS, EnglishDictionaryCreatedEvent } from 'src/_shared';
import { EnglishSentencesService } from '../english-sentences/english-sentences.service';
@Injectable()
export class EnglishDictionariesService {
    constructor(
        private readonly repository: EnglishDictionariesRepository,
                private readonly service: AuthService,
                private readonly sentenceService: EnglishSentencesService,
                private eventEmitter: EventEmitter2
    ){}

    async findAll(query: EnglishDictionaryListRequest, req): Promise<EnglishDictionaryListResponse> {
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

        const list: EnglishDictionaryListItemDto[] = rawData.map(item => ({
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

    async findOne(query: EnglishDictionaryDetailRequest, req): Promise<EnglishDictionaryDetailResponse> {
         const cookie = req.cookies['access_token'];
        const {user} = await this.service.verifyToken(cookie);
        const [word, sentences] = await Promise.all([
            this.repository.findOne(query._id),
            this.sentenceService.getSentencesByWordId(query._id, user._id)
        ])
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

    async create(dto: EnglishDictionaryCreateDto, req) {
        const cookie = req.cookies['access_token'];
        const {user} = await this.service.verifyToken(cookie);
        const newVocab = await this.repository.create(dto, user._id);
        
        this.eventEmitter.emit(
            ENGLISH_DICTIONARY_EVENTS.CREATED,
            new EnglishDictionaryCreatedEvent(newVocab._id.toString(), user._id)
        )
       
        return newVocab
    }

    async getOptions(dto: EnglishDictionaryGetOptionsRequest, req): Promise<EnglishDictionaryGetOptionsResponse> {
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
   
}
