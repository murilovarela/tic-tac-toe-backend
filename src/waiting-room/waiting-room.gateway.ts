import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WaitingRoomService } from './waiting-room.service';
import { CreateWaitingRoomDto } from './dto/create-waiting-room.dto';
import { UpdateWaitingRoomDto } from './dto/update-waiting-room.dto';

@WebSocketGateway()
export class WaitingRoomGateway {
  constructor(private readonly waitingRoomService: WaitingRoomService) {}

  @SubscribeMessage('createWaitingRoom')
  create(@MessageBody() createWaitingRoomDto: CreateWaitingRoomDto) {
    return this.waitingRoomService.create(createWaitingRoomDto);
  }

  @SubscribeMessage('findAllWaitingRoom')
  findAll() {
    return this.waitingRoomService.findAll();
  }

  @SubscribeMessage('findOneWaitingRoom')
  findOne(@MessageBody() id: number) {
    return this.waitingRoomService.findOne(id);
  }

  @SubscribeMessage('updateWaitingRoom')
  update(@MessageBody() updateWaitingRoomDto: UpdateWaitingRoomDto) {
    return this.waitingRoomService.update(updateWaitingRoomDto.id, updateWaitingRoomDto);
  }

  @SubscribeMessage('removeWaitingRoom')
  remove(@MessageBody() id: number) {
    return this.waitingRoomService.remove(id);
  }
}
