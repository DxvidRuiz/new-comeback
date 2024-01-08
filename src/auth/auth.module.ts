/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'profile/profile.module';
import { UsersModule } from 'users/users.module';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ValidationsServiceService } from './auth.validations-service';
import { jwtConstants } from './constants/jwt-constants';

@Module({
  imports: [

    forwardRef(() => UsersModule),
    forwardRef(() => ProfileModule),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ValidationsServiceService],
  exports: [AuthService, ValidationsServiceService],
})
export class AuthModule { }
