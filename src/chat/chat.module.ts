import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import Chat from './chat.model';
import { User } from 'src/user/user.model';
import { UserChat } from './user-chat.model';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [
    AuthModule,
    UserModule,
    SequelizeModule.forFeature([Chat, User, UserChat]),
  ],
})
export class ChatModule {}
