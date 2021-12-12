import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('enter_waiting_room')
  enterWaitingRoom(@MessageBody() data: string) {
    this.server.sockets.emit('entered_waiting_room', data);
  }

  @SubscribeMessage('enter_gaming_room')
  enterGamingRoom(@MessageBody() data: string) {
    this.server.sockets.emit('enter_gaming_room', data);
  }
}
