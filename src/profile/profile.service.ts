/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ImageResizeService } from './services/imageResize.service';
import { ImageSavingService } from './services/imageSaving.service';
import { ProfileQueryService } from './profile-query-service';
import { error, log } from 'console';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly resizeIMG: ImageResizeService,
    private readonly saveIMG: ImageSavingService,
    private readonly ProfileQueryService: ProfileQueryService,
  ) {}
  async uploadProfilePhoto(
    file: Express.Multer.File,
    // createProfileDto: CreateProfileDto,
    user: User,
  ) {
    const imageResized = await this.resizeIMG.resizeAndCompress(file.buffer, {
      width: 200,
      height: 200,
    });

    const userId = user.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const imgRoute = await this.saveIMG.saveProfilePhoto(imageResized, userId);
    try {
      return await this.ProfileQueryService.saveProfilePhotoRoute(
        userId,
        imgRoute,
      );
    } catch (error) {}
    throw new Error(`Error : ${error}`);

    // return
  }

  // Create empty profile
  async createEmptyProfile(userId: string): Promise<User> {
    const emptyProfileData: Partial<Profile> = {};
    const profileId = uuidv4(); //  UUID generation

    try {
      const newProfile = this.profileRepository.create({
        id: profileId,
        userId: userId, // Asignar el ID del usuario al perfil
        ...emptyProfileData,
      });
      await this.profileRepository.save(newProfile);
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['profile'],
      });

      return user;
    } catch (error) {
      // If an error occurs during profile creation, handle it
      if (error.code === '23505') {
        // Unique constraint violation (duplicate key)
        throw new ConflictException({
          statusCode: 409,
          message: 'A profile for this user already exists.',
        });
      } else {
        // Handle other errors
        throw error; // You might want to log the error or handle it differently
      }
    }
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: string) {
    try {
      return await this.profileRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(`Error : ${error}`);
    }
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
