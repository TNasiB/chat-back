import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    return newUser;
  }

  async findByUsername(username: string) {
    const matchedUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return matchedUser;
  }
}
