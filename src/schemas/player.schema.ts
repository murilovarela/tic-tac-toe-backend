import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Player {
  @Prop()
  gameHistory: string;
}

export type PlayerDocument = Player & Document;

export const PlayerSchema = SchemaFactory.createForClass(Player);
