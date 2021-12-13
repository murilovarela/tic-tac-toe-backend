import { PartialType } from '@nestjs/mapped-types';
import { CreateWaitingRoomDto } from './create-waiting-room.dto';

export class UpdateWaitingRoomDto extends PartialType(CreateWaitingRoomDto) {
  id: number;
}
