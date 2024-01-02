import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { RolesEnum } from 'common/roles.enum';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { ValidationsServiceService } from './auth.validations-service';
import { requestWithUser } from './constants/requestWithUser.interface';
import { Roles } from './decorators/roles.decorators';
import { CheckEmailDto } from './dto/check-email.dto';
import { CheckUsernameDto } from './dto/check-username.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly ValidationService: ValidationsServiceService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginUserDto) {
    try {
      const result = await this.authService.login(data);
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('register')
  async register(@Body() registerData: CreateUserDto) {
    return await this.authService.register(registerData);
  }

  // Register using facebook -------------------------------------------

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Request() req): Promise<any> {
    // El usuario ha sido autenticado exitosamente por Facebook, puedes manejar la lógica aquí
    return req.user;
  }

  @Post('checkemail')
  async checkemail(@Body() emailToCheck: CheckEmailDto) {
    return await this.ValidationService.checkemail(emailToCheck);
  }
  @Post('checkusername')
  async checkusername(@Body() usernameToCheck: CheckUsernameDto) {
    return await this.ValidationService.checkusername(usernameToCheck);
  }

  @Get('profile')
  @Roles(RolesEnum.User)
  @UseGuards(
    JwtAuthGuard,
    // RoleGuard
  )
  async profilelog(@Req() request: requestWithUser) {
    return request.user;
  }
}
