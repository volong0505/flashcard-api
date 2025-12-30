import { Controller, Get, Query, Req, Request } from '@nestjs/common';
import { EnglishFlashcardService } from './english-flashcards.service';
import { GetEnglishFlashcardRequest, GetEnglishFlashcardResponse } from '../../dtos/english-flashcard/get-one';

@Controller('english-flashcard')
export class EnglishFlashcardController {

    constructor(private readonly service: EnglishFlashcardService) {}

    @Get('flashcard')
    async getFlashcard(@Query() params: GetEnglishFlashcardRequest, @Request() request, @Req() req: any): Promise<GetEnglishFlashcardResponse> {
        const [result, nextReview] = await this.service.getFlashcard(params, request);
        req.message = 'next review: ' + nextReview
        return result
    }
}
