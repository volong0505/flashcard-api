export const ENGLISH_DICTIONARY_EVENTS = {
    CREATED: 'english-dictionary.created'
}

export class EnglishDictionaryCreatedEvent {
    constructor(
        public readonly vocabId: string,
        public readonly userId: string
    ){}
}