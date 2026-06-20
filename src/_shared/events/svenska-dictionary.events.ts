export const SVENSKA_DICTIONARY_EVENTS = {
    CREATED: 'svenska-dictionary.created'
}

export class SvenskaDictionaryCreatedEvent {
    constructor(
        public readonly vocabId: string,
        public readonly userId: string
    ){}
}