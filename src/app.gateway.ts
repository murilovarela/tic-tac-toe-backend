import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({ cors: '*:*' })
export class AppGateway {
  constructor(private readonly appService: AppService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('enter_waiting_room')
  async enterWaitingRoom(@MessageBody() data: string) {
    await this.appService.addUserToWaitingRoom(data);
    const matchResult = await this.appService.addPlayersToGamingRoom();

    if (matchResult) {
      const [gamingRoomId, playersId] = matchResult.split('@');

      for (const playerId of playersId.split(';')) {
        this.server.sockets.emit(`${playerId}:gaming_room`, gamingRoomId);
      }
    } else {
      this.server.sockets.emit(`${data}:waiting_room`, data);
    }
  }

  @SubscribeMessage('enter_gaming_room')
  async enterGamingRoom(@MessageBody() data: string) {
    const [gamingRoomId, playerId] = data.split('@');
    const gamingRoom = await this.appService.findGamingRoom(gamingRoomId);

    if (gamingRoom.playersId.includes(playerId)) {
      this.server.sockets.emit(
        `${playerId}:gaming_room_board`,
        gamingRoom.board,
      );
    }
  }

  @SubscribeMessage('add_turn_to_gaming_room')
  async addTurnToGamingRoom(@MessageBody() data: string) {
    const [gamingRoomId, boardStep] = data.split('@');
    const [x, y, playerId] = boardStep.split('+');

    const { board, playersId } = await this.appService.addGamingRoomTurn({
      x,
      y,
      playerId,
      gamingRoomId,
    });

    for (const playerId of playersId.split(';')) {
      this.server.sockets.emit(`${playerId}:gaming_room_update`, board);
    }
  }
}
