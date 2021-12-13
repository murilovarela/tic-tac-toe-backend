import { Module } from '@nestjs/common';
import { WaitingRoomService } from './waiting-room.service';
import { WaitingRoomGateway } from './waiting-room.gateway';

@Module({
  providers: [WaitingRoomGateway, WaitingRoomService]
})
export class WaitingRoomModule {}
