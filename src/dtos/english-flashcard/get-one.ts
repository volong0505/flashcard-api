
export class GetEnglishFlashcardResponse {
    _id?: string;
    vocabulary: {
        _id: string;
        word: string;
        translation: string;
        definition: string;
        ipa: string;
        usageNote: string;
        level: string;
        category: string;
    } | null;
    sentence: {
        _id: string;
        sentence: string;
        translation: string
    } | null;
    sentences?:  {
        _id: string;
        sentence: string;
        translation: string
    }[];
    cardType: string
}

export class GetEnglishFlashcardRequest {
    flashcardId?: string;
    sentenceId?: string;
    qualityNumber?: 1 | 2 | 3 | 4
}