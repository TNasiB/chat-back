import { SignUpDto } from './dto/sign-up.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const pass = signUpDto.password;
    const hash = await bcrypt.hash(pass, 5);

    this.userService.create({ username: signUpDto.username, password: hash });
  }

  async signIn(signInDto: SignUpDto) {
    const findedUser = await this.userService.findByUsername(
      signInDto.username,
    );

    const checkPassed = await bcrypt.compare(
      signInDto.password,
      findedUser.password,
    );

    if (!checkPassed) {
      throw new UnauthorizedException();
    }

    const payload = { sub: findedUser.id, username: findedUser.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
