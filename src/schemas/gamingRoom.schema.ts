import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class GamingRoom {
  @Prop()
  playersId: string;

  @Prop()
  board: string;
}

export type GamingRoomDocument = GamingRoom & Document;

export const GamingRoomSchema = SchemaFactory.createForClass(GamingRoom);
