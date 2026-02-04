
export class EnglishDictionaryDetailRequest {
    _id: string;
}

export class EnglishDictionaryDetailResponse {
    dictionary: {
        _id: string;
        word: string;
        translation: string;
        definition: string;
        level: string;
        category: string;
        topics: string[];
        usageNote: string;
        createAt: Date;
    };
    sentences: {
        _id: string;
        sentence: string;
        translation: string;
    }[];
    flashcard: {
        easeFactor: number;
        interval: number;
        repetition: number;
        nextReview: Date;
        state: string
    }
}
