import { FlashcardHistoryDto, Fm2AlgorithmDto } from "../../_shared";

export interface EnglishFlashcardDto {
    sm2: Fm2AlgorithmDto;
    history: FlashcardHistoryDto[]
}

export enum EnglishFlashCardStateEnum {
    NEW = 'NEW',
    RECOGNITION = 'RECOGNITION',
    SENTENCE_REWRITING = 'SENTENCE_REWRITING',
    MEMORIZED = 'MEMORIZED'
}

export const ENGLISH_FLASHCARD_CONFIG = {
    INITIAL_EASE: 250,  // 250%
    MIN_EASE: 130,  // Ease không thấp hơn 130
    GRADUATING_INTERVAL: 1, 
    EASY_INTERVAL: 4, 
    HARD_MULTIPLIER: 1.2 //Nhân 1.2 nếu chọn Hard
}