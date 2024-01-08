/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Profile } from './entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ImageResizeService } from './services/imageResize.service';
import { ImageSavingService } from './services/imageSaving.service';
import { UserQueryService } from 'users/users-query-service';
import { ProfileQueryService } from './profile-query-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ImageResizeService,
    ImageSavingService,
    UserQueryService,
    ProfileQueryService,
  ],
  exports: [
    ProfileService,
    ImageResizeService,
    ImageSavingService
  ], // Si necesitas exportar el servicio
})
export class ProfileModule {}
