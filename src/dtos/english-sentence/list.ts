export class EnglishSentenceListRequest {
    keyword: string;
    page: number
}

export class EnglishSentenceListResponse {
    list: EnglishSentenceItemDto[];
    total: number
}

export class EnglishSentenceItemDto {
    sentence: string;
    translation: string;
    words
}