export * from './create';
export * from './list';
export * from './get-options';
export * from './detail'

export interface EnglishDictionaryDto {
    word: string;
    translation: string;
    definition: string;
    usageNote: string;
    ipa: string;
    level: string;
    category: string; // part of speech and more: idiom, structure .v.v
    createDate: Date;
    updateDate: Date
    deleteDate: Date
}

