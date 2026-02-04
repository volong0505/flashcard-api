export class EnglishSentenceUpdateDto {
    _id: string;
    update: {
        key: string;
        value: string | string[]
    }
}