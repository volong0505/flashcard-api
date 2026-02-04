export * from './create';
export * from './list';
export * from './update';
export * from './get-sentence-flashcard'

export class EnglishSentenceDto {
    sentence: string;
    translation: string;
    wordIds: string[];

    progress: EnglishSenteceProgressDto;

    createDate: Date;
    updateDate: Date
    deleteDate: Date
}

export class EnglishSenteceProgressDto {
    repetition: number;
    skip: number;
    date: Date
}