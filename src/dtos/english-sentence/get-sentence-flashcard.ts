export class GetSentenceFlashcardRequest {
    userId: string
}

export class GetSentenceFlashcardResponse {
    _id: string;
    words: string[];
    sentence: string;
    translation: string;
}