import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UserService } from 'src/user/user.service';
import Chat from './chat.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserChat } from './user-chat.model';

@Injectable()
export class ChatService {
  constructor(
    private userService: UserService,
    @InjectModel(Chat) private chatRepository: typeof Chat,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserChat) private userChatRepository: typeof UserChat,
  ) {}

  async createChat(createChatDto: CreateChatDto) {
    const interlocutor = await this.userRepository.findByPk(
      createChatDto.interlocutor,
    );

    const newChat = await this.chatRepository.create();

    await this.userChatRepository.create({
      userId: createChatDto.userId,
      chatId: newChat.id,
    });

    await this.userChatRepository.create({
      userId: interlocutor.id,
      chatId: newChat.id,
    });

    return newChat;
  }

  async getChatByUser(userId: number, interlocutor: number) {
    const chat = await Chat.findOne({
      include: [
        {
          model: User,
          where: { id: userId },
        },
        {
          model: User,
          where: { id: interlocutor },
        },
      ],
    });

    if (!chat) throw new NotFoundException('Chat not found');

    return chat;
  }
}
