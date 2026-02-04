// src/tts/tts.service.ts
import { Injectable } from '@nestjs/common';
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';
import path from 'path';

@Injectable()
export class GoogleTtsService {
    private client: TextToSpeechClient;

    constructor() {
        this.client = new TextToSpeechClient({
            keyFilename: path.join(process.cwd(), 'google-creds.json'),
        });
    }

    async synthesize(text: string): Promise<Uint8Array | string> {
        const ssml = `
            <speak>
              <prosody rate="slow" pitch="+2st">
                ${text}
              </prosody>
            </speak>`;

        const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
            input: { ssml },
            voice: {
                languageCode: "en-US",
                name: 'en-US-Wavenet-F',
                ssmlGender: protos.google.cloud.texttospeech.v1.SsmlVoiceGender.NEUTRAL
            },
            audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3, speakingRate: 0.9},
        }

        const responseArray = await this.client.synthesizeSpeech(request);
        const response = responseArray[0];

        if (!response.audioContent) {
            throw new Error('Google Cloud TTS did not return any audio content');
        }
        return response.audioContent
    }
}