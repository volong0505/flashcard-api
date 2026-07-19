import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { EnglishStructuresService } from './english-structures.service';

@Controller('english-structures')
export class EnglishStructuresController {
        constructor(
                private readonly service: EnglishStructuresService,
            ) {}
        
            @Post()
            async create(@Body() body: any, @Request() req) {
                return this.service.create(body, req)
            }
    
            // @Put()
            // async update(@Body() body: EnglishSentenceUpdateDto, @Request() req) {
            //     try {
            //     await this.service.update(body, req)
            //     return {
            //         status: 'success',
            //         message: `Sentence is updated.`
            //     }
            // } catch(error) {
            //      return {
            //         status: 'failed',
            //         message: `Updating ${body.update} was unsuccessful.`
            //     }
            // }
            // }
        
            @Get('find-all')
            // @UsesGuard(JwtAuth)
            findAll(@Query() query: any, @Request() req): Promise<any> {
                return this.service.findAll(query, req)
            }
            
}
