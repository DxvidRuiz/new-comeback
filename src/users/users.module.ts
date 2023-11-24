import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { User } from './entities/user.entity';
import { UserQueryService } from './users-query-service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfileModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, UserQueryService],
  exports: [UsersService, UserQueryService, TypeOrmModule.forFeature([User])],
})
export class UsersModule { }
