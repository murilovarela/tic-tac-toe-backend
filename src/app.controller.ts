import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getPing(): string {
    return this.appService.getPing();
  }

  @Post('/authenticate')
  async postAuthenticate(@Body() body): Promise<string> {
    const playerId = await this.appService.getOrCreatePlayer(body.playerId);

    return playerId;
  }
}
