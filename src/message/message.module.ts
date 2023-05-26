import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Chat from 'src/chat/chat.model';
import Message from './message.model';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [SequelizeModule.forFeature([Chat, Message])],
})
export class MessageModule {}
