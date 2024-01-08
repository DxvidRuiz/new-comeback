/* eslint-disable prettier/prettier */
// user-query.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'users/entities/user.entity';

@Injectable()
export class ProfileQueryService {
  constructor(
    // @Inject(forwardRef(() => UsersService))
    // private readonly usersService: UsersService,
    @InjectRepository(Profile)
    private ProfileRepository: Repository<Profile>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async findUserByProfileId(id: any) {
    try {
      const profile = await this.UserRepository.findOneBy({ id });
      console.log(profile);
      if (!profile) {
        throw new Error('Profile not found');
      }

      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  async findOnebyEmail() {
    try {
      return this.ProfileRepository.findOneBy({});
    } catch (error) {
      throw new Error(`Error : ${error}`);
    }
  }

  async findOnebyUsername() {
    try {
      return this.ProfileRepository.findOneBy({});
    } catch (error) {
      throw new Error(`Error : ${error}`);
    }
  }

  async findAll() {
    return this.ProfileRepository.find();
  }
  //------------------------------------------------------------------------------------------------
  async saveProfilePhotoRoute(
    userId: any,
    photoRoute: string,
  ): Promise<Profile> {
    try {
      console.log('before profile route save');
      console.log(userId);

      // Buscar el usuario por ID
      const profile = await this.ProfileRepository.findOneBy({ userId });


      // Verificar si el usuario existe
      if (!profile) {
        throw new Error('Profile not found');
      }

      profile.profilePhotoRoute = photoRoute;
      // Obtener el perfil asociado al usuario
      await this.ProfileRepository.save(profile);

      console.log('after profile route save');

      return profile; // Retorna el perfil actualizado
    } catch (error) {
      console.log(error);
      throw error; // Re-lanzar el error para que sea manejado por el controlador
    }
  }

  // Puedes agregar más funciones de consulta según sea necesario
}
