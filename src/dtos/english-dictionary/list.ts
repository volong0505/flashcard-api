
export class EnglishDictionaryListRequest {
    keyword?: string;
    page: number
}

export class EnglishDictionaryListResponse {
    list!: EnglishDictionaryListItemDto[];
    total!: number
}

export class EnglishDictionaryListItemDto {
    _id!: string;
    word!: string;
    translation: string;
    ipa!: string;
    definition: string;
    level: string;
    topics: string[];
    category: string;
    usageNote: string;
}