import { Body, Controller, Get, Logger, Post, Query, Request} from '@nestjs/common';
import { EnglishDictionariesService } from './english-dictionaries.service';
import { EnglishDictionaryCreateDto, EnglishDictionaryDetailRequest, EnglishDictionaryDetailResponse, EnglishDictionaryGetOptionsRequest, EnglishDictionaryGetOptionsResponse, EnglishDictionaryListRequest, EnglishDictionaryListResponse} from '../../dtos';

@Controller('english-dictionaries')
export class EnglishDictionariesController {
    constructor(
        private readonly service: EnglishDictionariesService,
    ) {}

    @Post()
    async create(@Body() body: EnglishDictionaryCreateDto, @Request() req) {
        try {
            await this.service.create(body, req);

            return {
                status: 'success',
                message: body.word + ' is created.'
            }
        } catch(error) {
             return {
                status: 'failed',
                message: `Creating ${body.word} was unsuccessful.`
            }
        }
    }

    @Get('find-all')
    findAll(@Query() query: EnglishDictionaryListRequest, @Request() req): Promise<EnglishDictionaryListResponse> {
        return this.service.findAll(query, req)
    }

    @Get('find-one')
    findOne(@Query() query: EnglishDictionaryDetailRequest, @Request() req): Promise<EnglishDictionaryDetailResponse> {
        return this.service.findOne(query, req)
    }

    @Get('get-options')
    getOptions(@Query() query: EnglishDictionaryGetOptionsRequest, @Request() req): Promise<EnglishDictionaryGetOptionsResponse> {
        return this.service.getOptions(query, req)
    }
}
