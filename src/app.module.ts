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

const dataBaseInstance = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'timerannasibullin',
  password: 'root',
  database: 'chat',
  autoLoadModels: true,
  models: [User, Chat, Message],
});

const configModule = ConfigModule.forRoot({ load: [configuration] });

const jwtModule = JwtModule.register({
  global: true,
  secret: '1234',
  signOptions: { expiresIn: '60s' },
});

@Module({
  imports: [
    dataBaseInstance,
    configModule,
    UserModule,
    ChatModule,
    MessageModule,
    AuthModule,
    jwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
