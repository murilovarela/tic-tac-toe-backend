import { Injectable } from '@nestjs/common';
import { CreateWaitingRoomDto } from './dto/create-waiting-room.dto';
import { UpdateWaitingRoomDto } from './dto/update-waiting-room.dto';

@Injectable()
export class WaitingRoomService {
  create(createWaitingRoomDto: CreateWaitingRoomDto) {
    return 'This action adds a new waitingRoom';
  }

  findAll() {
    return `This action returns all waitingRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waitingRoom`;
  }

  update(id: number, updateWaitingRoomDto: UpdateWaitingRoomDto) {
    return `This action updates a #${id} waitingRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} waitingRoom`;
  }
}
