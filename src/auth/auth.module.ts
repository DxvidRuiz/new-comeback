import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'users/users.module';
import { UsersService } from 'users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidationsServiceService } from './auth.validations-service';
import { jwtConstants } from './constants/jwt-constants';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, ValidationsServiceService],

})
export class AuthModule { }
