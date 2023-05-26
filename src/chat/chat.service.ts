import { Injectable } from '@nestjs/common';
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

  async createChat(createChatDto: CreateChatDto & { owner_token: string }) {
    const user = await this.userService.findByToken(createChatDto.owner_token);

    const interlocutor = await this.userRepository.findByPk(
      createChatDto.interlocutor,
    );

    const newChat = await this.chatRepository.create();

    await this.userChatRepository.create({
      userId: user.id,
      chatId: newChat.id,
    });

    await this.userChatRepository.create({
      userId: interlocutor.id,
      chatId: newChat.id,
    });

    return newChat;
  }

  async getByUser(token: string) {
    const user = await this.userService.findByToken(token);
    const userChats = await this.userChatRepository.findAll({
      where: { userId: user.id },
    });
    const chatIds = userChats.map((userChat) => userChat.chatId);
    return chatIds;
  }
}
