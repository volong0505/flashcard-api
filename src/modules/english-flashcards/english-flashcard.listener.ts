import { Injectable } from "@nestjs/common";
import { EnglishFlashcardService } from "./english-flashcards.service";
import { OnEvent } from "@nestjs/event-emitter";
import { ENGLISH_DICTIONARY_EVENTS, EnglishDictionaryCreatedEvent } from "src/_shared";

@Injectable()
export class EnglishFlascardListener {

    constructor(
        private readonly service: EnglishFlashcardService
    ) {}

    @OnEvent(ENGLISH_DICTIONARY_EVENTS.CREATED)
    async handleEnglishDictionaryCreated(payload: EnglishDictionaryCreatedEvent) {
        await this.service.create(payload.vocabId, payload.userId)
    }
} 