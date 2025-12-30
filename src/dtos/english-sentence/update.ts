export class EnglishSentenceUpdateDto {
    _id: string;
    update: {
        [key: string]: string | string[];
    }
}