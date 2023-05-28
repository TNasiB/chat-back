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
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Post('create')
  createChat(@Body() chat: CreateChatDto, @Request() request: RequestType) {
    const userSenderId = (request.user as { sub: number }).sub;

    const newChat = this.chatService.createChat({
      userId: userSenderId,
      ...chat,
    });

    return newChat;
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
