import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
