import { Module } from "@nestjs/common";
import { GoogleTtsController } from "./google-tts.controller";
import { GoogleTtsService } from "./google-tts.service";

@Module({
    imports: [],
    controllers: [GoogleTtsController],
    providers: [GoogleTtsService]
})
export class GoogleTtsModule {}