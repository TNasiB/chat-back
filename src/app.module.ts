import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

const dataBaseInstance = SequelizeModule.forRoot({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'timerannasibullin',
  password: 'root',
  database: 'chat',
  autoLoadModels: true,
  models: [],
});

@Module({
  imports: [dataBaseInstance],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
