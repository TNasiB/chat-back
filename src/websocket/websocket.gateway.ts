import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: ['http://localhost:5173'] },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  counter: number;

  private connectedClients: Set<string> = new Set();

  @SubscribeMessage('join-chat')
  handleJoinChat(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('send-message')
  handleSendMessage(client: Socket, message: string) {
    console.log(message);
    this.server.emit('message-receive', message);
  }

  handleConnection(client: Socket) {
    const queryParam = client.handshake.query?.userId;
    const id = Array.isArray(queryParam) ? queryParam.at(-1) : queryParam;
    this.connectedClients.add(id);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
  }

  // sendChats() {}
}
