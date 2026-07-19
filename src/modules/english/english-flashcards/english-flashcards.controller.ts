import { Controller, Get, Query, Req, Request } from '@nestjs/common';
import { EnglishFlashcardService } from './english-flashcards.service';
import { GetEnglishFlashcardRequest, GetEnglishFlashcardResponse } from '../../../dtos/english-flashcard/get-one';

@Controller('english-flashcard')
export class EnglishFlashcardController {

    constructor(private readonly service: EnglishFlashcardService) {}

    @Get('flashcard')
    async getFlashcard(@Query() params: GetEnglishFlashcardRequest, @Request() request, @Req() req: any): Promise<GetEnglishFlashcardResponse | null> {
        const [result, nextReview] = await this.service.getFlashcard(params, request);
        req.message = 'next review: ' + nextReview;
        console.log(nextReview)
        let nextReviewStr =  nextReview ? new Date(nextReview).toISOString().slice(0, 10) : null
        return {
                flashcard: result,
                status: 'success',
                message: nextReviewStr ? 'Next review date: ' + nextReviewStr : ''
        }
    }
}
