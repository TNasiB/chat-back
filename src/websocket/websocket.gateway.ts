import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewRoomDto } from './dto/new-room.dto';

@Injectable()
@WebSocketGateway({
  cors: { origin: ['http://localhost:5173'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  counter: number;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    const queryParam = client.handshake.query?.userId;
    const id = Array.isArray(queryParam) ? queryParam.at(-1) : queryParam;
    this.connectedClients.set(id, client);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
  }

  async createRoom(newRoomDto: NewRoomDto) {
    const userClient = this.connectedClients.get(newRoomDto.userId);
    const roomId = String(newRoomDto.chatId);

    await userClient.join(roomId);

    this.server
      .to(roomId)
      .emit('room-message', 'Поздаровайтесь с собеседником');
  }
}
