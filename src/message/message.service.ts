import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectModel } from '@nestjs/sequelize';
import Message from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { content, chatId } = createMessageDto;
    await this.messageRepository.create({ content, chatId });
  }

  async getMessagesByChat(id: string) {
    const messages = await this.messageRepository.findAll({ where: { id } });
    return messages;
  }
}
