import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as RequestType } from 'express';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private authGuard: AuthGuard,
  ) {}

  @HttpCode(201)
  @Post('create')
  createChat(@Body() chat: CreateChatDto, @Request() request: RequestType) {
    const token = this.authGuard.extractTokenFromHeader(request);

    const newChat = this.chatService.createChat({
      owner_token: token,
      ...chat,
    });

    return newChat;
  }

  @HttpCode(200)
  @Get()
  getByUser(@Request() request: RequestType) {
    const token = this.authGuard.extractTokenFromHeader(request);

    const chats = this.chatService.getByUser(token);

    return chats;
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
