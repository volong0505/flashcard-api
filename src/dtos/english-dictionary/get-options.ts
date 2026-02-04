export class EnglishDictionaryGetOptionsRequest {
    keyword: string;
}

export class EnglishDictionaryGetOptionsResponse {
    options!: EnglishDictionaryGetOptionsItemDto[];
}

export class EnglishDictionaryGetOptionsItemDto {
    _id!: string;
    word!: string;
    translation: string;
}