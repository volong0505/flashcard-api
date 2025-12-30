import { Body, Controller, Get, Post, Put, Query, Request } from '@nestjs/common';
import { EnglishSentenceCreateDto, EnglishSentenceListRequest, EnglishSentenceListResponse, EnglishSentenceUpdateDto } from '../../dtos';
import { EnglishSentencesService } from './english-sentences.service';

@Controller('english-sentences')
export class EnglishSentencesController {

    constructor(
            private readonly service: EnglishSentencesService,
        ) {}
    
        @Post()
        async create(@Body() body: EnglishSentenceCreateDto, @Request() req) {
            return this.service.create(body, req)
        }

        @Put()
        async update(@Body() body: EnglishSentenceUpdateDto, @Request() req) {
            try {
            await this.service.update(body, req)
            return {
                status: 'success',
                message: `Sentence is updated.`
            }
        } catch(error) {
             return {
                status: 'failed',
                message: `Updating ${body.update} was unsuccessful.`
            }
        }
        }
    
        @Get('find-all')
        // @UsesGuard(JwtAuth)
        findAll(@Query() query: EnglishSentenceListRequest, @Request() req): Promise<EnglishSentenceListResponse> {
            return this.service.findAll(query, req)
        }
        
}
