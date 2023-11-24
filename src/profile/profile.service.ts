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

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly resizeIMG: ImageResizeService,
    private readonly saveIMG: ImageSavingService,
  ) {

  }
  async uploadProfilePhoto(file: Express.Multer.File, createProfileDto: CreateProfileDto, user: User) {

    const imageResized = await this.resizeIMG.resizeAndCompress(file.buffer, {
      width: 200, height: 200
    })


    const userId = user.id
    const imgRoute = await this.saveIMG.saveProfilePhoto(imageResized, userId)


    return
      ;
  }

  // Create empty profile 
  async createEmptyProfile(userId: string): Promise<Profile> {

    const emptyProfileData: Partial<Profile> = {};
    const profileId = uuidv4(); //  UUID generation

    try {
      const newProfile = this.profileRepository.create({
        id: profileId,
        user: { id: userId }, // Asignar el userId al campo user
        ...emptyProfileData,
      });
      const savedProfile = await this.profileRepository.save(newProfile);
      return savedProfile;
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

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
