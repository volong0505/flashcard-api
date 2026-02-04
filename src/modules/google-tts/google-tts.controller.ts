import { Controller, Get, Query, Res } from "@nestjs/common";
import { GoogleTtsService } from "./google-tts.service";
import type { Response } from 'express';
import { NoTransform } from "../../_decorators/no-transform.decorator";

@Controller()
export class GoogleTtsController {
    constructor(
        private readonly ttsService: GoogleTtsService
    ) {}

    @Get('speak')
    @NoTransform() // API này sẽ không bị bọc JSON nữa
    async speak(@Query('text') text: string, @Res() res: Response ) {
        if (!text) return res.status(400).send('Text us required');
        const audioContent = await this.ttsService.synthesize(text);

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'attachment; filename=speech.mp3');
        return res.send(audioContent);
    }
}