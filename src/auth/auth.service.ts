import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UsersService } from 'users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService

  ) { }
  // ---------------------------------------------------------------------------
  async login(logindto: LoginUserDto) {
    const logUser = await this.userService.findbyEmailWithPassword(logindto.email)
    if (!logUser) {
      throw new BadRequestException({
        statusCode: 400,
        message: {
          auth_error: 'No user found',
        },
      });
    }

    const passwordValid = await bcrypt.compare(logindto.password, logUser.password)
    if (!passwordValid) {
      throw new BadRequestException({
        statusCode: 400,
        message: {
          auth_error: 'Invalid password',
        },
      });

    }
    const payload = { id: logUser.id, role: logUser.role };
    const token = await this.jwtService.signAsync(payload)

    return {
      token,
      user: logUser
    };


  }

  // -----------------------------------------------------------------------

  async register(createuser: CreateUserDto) {

    return await this.userService.create(createuser);
  }
  async profilelog() {
    return "Hola con permisos"
  }
}
