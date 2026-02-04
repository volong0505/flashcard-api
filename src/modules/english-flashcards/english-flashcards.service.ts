import { Injectable, Logger } from '@nestjs/common';
import { EnglishFlashcardsRepository } from './english-flashcards.repository';
import { ENGLISH_FLASHCARD_CONFIG, EnglishFlashcardDto, EnglishFlashCardStateEnum } from '../../dtos';
import { AuthService } from '../auth/auth.service';
import { GetEnglishFlashcardRequest, GetEnglishFlashcardResponse } from '../../dtos/english-flashcard/get-one';
import { Fm2AlgorithmDto } from '../../_shared';
import { EnglishSentencesService } from '../english-sentences/english-sentences.service';

@Injectable()
export class EnglishFlashcardService {
    constructor(
        private readonly repository: EnglishFlashcardsRepository,
        private readonly service: AuthService,
        private readonly sentenceService: EnglishSentencesService
    ) { }

    async create(vocabId: string, userId: string) {
        const flashcard: EnglishFlashcardDto = {
            sm2: {
                easeFactor: ENGLISH_FLASHCARD_CONFIG.INITIAL_EASE,
                interval: 0,
                repetition: 0,
                state: EnglishFlashCardStateEnum.NEW,
                nextReview: new Date()
            },
            history: []
        }
        return this.repository.create(vocabId, userId, flashcard)
    }

    async getFlashcard(params: GetEnglishFlashcardRequest, req): Promise<[GetEnglishFlashcardResponse, string]> {
        let nextReview;
        const cookie = req.cookies['access_token'];
        const { user } = await this.service.verifyToken(cookie);
    
        if (params.flashcardId && params.flashcardId != 'undefined' && params.flashcardId != 'null') {
            nextReview = await this.updateFlashcard(params, user._id);
        };

        if (params.sentenceId && params.sentenceId != 'undefined' && params.sentenceId != 'null') {
            await this.sentenceService.updateSentenceFlashcard(params.sentenceId)
        }

        const flashcard = await this.repository.getFlashcard(user._id);

        if (flashcard.sm2.state == EnglishFlashCardStateEnum.SENTENCE_REWRITING || flashcard.sm2.state == EnglishFlashCardStateEnum.MEMORIZED ) {
            const sentence = await this.sentenceService.getNextSentence({ wordId: flashcard.vocabularyId.toString(), userId: user._id});

            if (sentence._id) {
                const result: GetEnglishFlashcardResponse = {
                _id: flashcard._id.toString(),
                vocabulary: null,
                sentence: {
                    _id: sentence._id.toString(),
                    sentence: sentence.sentence,
                    translation: sentence.translation
                },
                cardType: EnglishFlashCardStateEnum.SENTENCE_REWRITING
            }
            return [result, nextReview]
            }
        } 

        const sentences = await this.sentenceService.getSentencesByWordId(flashcard.vocabularyId.toString(), user._id);

        const result = {
            _id: flashcard._id.toString(),
            vocabulary: {
                _id: flashcard.vocabularyId.toString(),
                cardType: flashcard.sm2.state,
                word: flashcard.vocabulary.word,
                translation: flashcard.vocabulary.translation,
                definition: flashcard.vocabulary.definition,
                ipa: flashcard.vocabulary.ipa,
                usageNote: flashcard.vocabulary.usageNote,
                level: flashcard.vocabulary.level,
                category: flashcard.vocabulary.category,
            },
            sentence: null,
            sentences,
            cardType: flashcard.sm2.state 
        }
        return [result, nextReview]
    }

    async updateFlashcard(params: GetEnglishFlashcardRequest, userId: string) {
        const { flashcardId, qualityNumber = 3} = params;
        if (!flashcardId) return;
        
        if (params.sentenceId) {
            await this.sentenceService.updateSentenceFlashcard(params.sentenceId)
        }

        const flashcard = await this.repository.findById(flashcardId);
        if (!flashcard) return;

        let { interval, easeFactor, repetition, state } = flashcard.sm2;

        interval = interval == 0 ? 1 : interval;
        easeFactor = easeFactor < 130 ? ENGLISH_FLASHCARD_CONFIG.INITIAL_EASE : easeFactor;

        const now = new Date();

        // Xử lý trạng thái NEW
        if (state === EnglishFlashCardStateEnum.NEW) {
            interval = 0;
            state = EnglishFlashCardStateEnum.RECOGNITION
        }

        // Xử lý trạng thái RECOGNITION
        else {
            switch (+qualityNumber) {
                case 1:
                    interval = 0; // học tiếp vào 5p nữa
                    // state = EnglishFlashCardStateEnum.RECOGNITION; // tiếp tục RECOGNITION state
                    easeFactor = Math.max(ENGLISH_FLASHCARD_CONFIG.MIN_EASE, easeFactor - 20); // Phạt Ease
                    repetition = 0;
                    break;

                case 2:
                    interval = 1; // Nhắc lại vào ngày mai
                    // state = EnglishFlashCardStateEnum.RECOGNITION; // Quay lại giai đoạn học
                    easeFactor = Math.max(ENGLISH_FLASHCARD_CONFIG.MIN_EASE, easeFactor - 15);
                    repetition++;
                    break;

                case 3:
                   repetition += 1;
                    if (repetition === 1) {
                      interval = 1;
                    } else if (repetition === 2) {
                      interval = 6;
                    } else {
                    const bonus = 1.0;                  
                    interval = Math.round(interval * (easeFactor / 100) * bonus);
                    }
                    break;
                case 4: // GOOD - nhớ bình thường
                    state = EnglishFlashCardStateEnum.MEMORIZED
                    easeFactor += 15;
                    repetition += 1;
                    if (repetition === 1) {
                      interval = 1;
                    } else if (repetition === 2) {
                      interval = 6;
                    } else {    
                    const bonus = 1.3;                
                    interval = Math.round(interval * (easeFactor / 100) * bonus);
                    }
                    break;
            }
        }

        console.log(easeFactor)
        // Tính nextReview 
        const nextReview = new Date();
        if (interval == 0) nextReview.setMinutes(now.getMinutes() + 5);
        else nextReview.setDate(now.getDate() + interval)

        const newSm2: Fm2AlgorithmDto = {
            interval, easeFactor, repetition, state, nextReview
        }
        Logger.log(nextReview   )
        await this.repository.updateSm2(flashcard._id, newSm2);
        return nextReview
    }
}
