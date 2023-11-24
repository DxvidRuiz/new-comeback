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

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ], controllers: [ProfileController],
  providers: [ProfileService, ImageResizeService, ImageSavingService,],
  exports: [ProfileService, ImageResizeService, ImageSavingService], // Si necesitas exportar el servicio
})
export class ProfileModule { }
