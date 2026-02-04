export class GetSentenceFlashcardRequest {
    userId: string;
    wordId: string
}

export class GetSentenceFlashcardResponse {
    _id: string;
    sentence: string;
    translation: string;
}