import { Body, Controller, HttpCode, Post, Request, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private authGuard: AuthGuard,
  ) {}

  @HttpCode(201)
  @Post('create')
  createChat(@Body() chat: CreateChatDto, @Request() request) {
    const token = this.authGuard.extractTokenFromHeader(request);

    const newChat = this.chatService.createChat({
      owner_token: token,
      ...chat,
    });

    return newChat;
  }

  @HttpCode(200)
  @Get()
  getByUser(@Request() request) {
    const token = this.authGuard.extractTokenFromHeader(request);

    const chats = this.chatService.getByUser(token);

    return chats;
  }
}
