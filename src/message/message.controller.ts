import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get(':id')
  getMessageByChat(@Param('id') id: string) {
    return this.messageService.getMessagesByChat(id);
  }
}
