import { Body, Controller, Get, Logger, Post, Query, Request} from '@nestjs/common';
import { EnglishDictionariesService } from './english-dictionaries.service';
import { EnglishDictionaryCreateDto, EnglishDictionaryListRequest, EnglishDictionaryListResponse} from '../../dtos';
import { GetUser } from 'src/_decorators/get-user.decorator';

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
}
