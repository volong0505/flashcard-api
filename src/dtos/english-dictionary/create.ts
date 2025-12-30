
export class EnglishDictionaryCreateDto {
    word: string;
    translation: string;
    definition?: string;
    usageNote?: string;
    ipa?: string;
    level?: string;
    category?: string; // part of speech and more: idiom, structure .v.v
}