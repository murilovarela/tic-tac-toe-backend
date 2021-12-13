import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { GamingRoom, GamingRoomSchema } from './schemas/gamingRoom.schema';
import { Player, PlayerSchema } from './schemas/player.schema';
import { WaitingRoom, WaitingRoomSchema } from './schemas/waitingRoom.schema';
import { WaitingRoomModule } from './waiting-room/waiting-room.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://murilovarela:nu4UfDzDsfgxtN4@cluster0.hzaao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: WaitingRoom.name, schema: WaitingRoomSchema },
    ]),
    MongooseModule.forFeature([
      { name: GamingRoom.name, schema: GamingRoomSchema },
    ]),
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    WaitingRoomModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
