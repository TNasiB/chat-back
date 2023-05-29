import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  Get,
  UseGuards,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as RequestType } from 'express';
import { ChatGateway } from 'src/websocket/websocket.gateway';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private chatGateway: ChatGateway,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post('create')
  async createChat(
    @Body() chat: CreateChatDto,
    @Request() request: RequestType,
  ) {
    const userSenderId = (request.user as { sub: number }).sub;

    try {
      const newChat = await this.chatService.createChat({
        userId: userSenderId,
        ...chat,
      });

      await this.chatGateway.createRoom({
        userId: String(userSenderId),
        interlocutor: String(chat.interlocutor),
        chatId: newChat.id,
      });

      return newChat;
    } catch {
      return new InternalServerErrorException(
        'Internal server error, cannot create chat and ws connection',
      );
    }
  }

  @UseGuards(AuthGuard)
  @Get(':interlocutor')
  async getChatByUser(
    @Request() req: RequestType,
    @Param('interlocutor') interlocutor,
  ) {
    const userSenderId = (req.user as { sub: number }).sub;
    const chat = await this.chatService.getChatByUser(
      userSenderId,
      interlocutor,
    );
    return chat;
  }
}
