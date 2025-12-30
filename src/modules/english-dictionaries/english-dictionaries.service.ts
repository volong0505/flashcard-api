import { Injectable } from '@nestjs/common';
import { EnglishDictionaryCreateDto, EnglishDictionaryListItemDto, EnglishDictionaryListRequest, EnglishDictionaryListResponse} from '../../dtos';
import { EnglishDictionariesRepository } from './english-dictionaries.repository';
import { AuthService } from '../auth/auth.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ENGLISH_DICTIONARY_EVENTS, EnglishDictionaryCreatedEvent } from 'src/_shared';
@Injectable()
export class EnglishDictionariesService {
    constructor(
        private readonly repository: EnglishDictionariesRepository,
                private readonly service: AuthService,
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
            usageNote: item.usageNote
        }));        
        // Return the Word list
        return {
            list,
            total
        };
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
   
}
