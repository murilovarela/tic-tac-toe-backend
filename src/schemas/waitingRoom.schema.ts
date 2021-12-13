import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WaitingRoom {
  @Prop()
  playersId: string;
}

export type WaitingRoomDocument = WaitingRoom & Document;

export const WaitingRoomSchema = SchemaFactory.createForClass(WaitingRoom);
