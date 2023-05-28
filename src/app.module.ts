import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
import { User } from './user/user.model';
import Chat from './chat/chat.model';
import Message from './message/message.model';
import { JwtModule } from '@nestjs/jwt';
import { UserChat } from './chat/user-chat.model';
import { ChatGateway } from './websocket/websocket.gateway';

const dataBaseInstance = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'timerannasibullin',
  password: 'root',
  database: 'chat2',
  autoLoadModels: true,
  models: [User, Chat, Message, UserChat],
});

const configModule = ConfigModule.forRoot({ load: [configuration] });

const jwtModule = JwtModule.register({
  global: true,
  secret: 'pabjv',
  signOptions: { expiresIn: '1d' },
});

@Module({
  imports: [
    dataBaseInstance,
    configModule,
    jwtModule,
    UserModule,
    ChatModule,
    MessageModule,
    AuthModule,
    ChatGateway,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
