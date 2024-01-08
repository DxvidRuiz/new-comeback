/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { ProfileService } from 'profile/profile.service';
import { Repository } from 'typeorm'; // Importa Repository de TypeORM
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserQueryService } from './users-query-service';

export interface CreateUserResponse {
  token: string;
  user: User;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserQueryService))
    @Inject(forwardRef(() => UserQueryService))
    private readonly UserQueryService: UserQueryService,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
  ) {}
  async create(createUserData: CreateUserDto): Promise<CreateUserResponse> {
    try {
      // Check if the email already exists
      const exist = await this.UserQueryService.findOnebyEmail(
        createUserData.email,
      );
      if (exist) {
        throw new BadRequestException({
          statusCode: 400,
          message: {
            email: ['Email already exists'],
          },
        });
      }

      // Check if the username already exists
      const idExist = await this.UserQueryService.findOnebyUsername(
        createUserData.username,
      );
      if (idExist) {
        throw new BadRequestException({
          statusCode: 400,
          message: {
            Username: ['Username already exists'],
          },
        });
      }

      // Hash the password before storing it
      const passwordhashed = await bcrypt.hash(createUserData.password, 10);

      // Create a user object with the hashed password
      const data = this.userRepository.create({
        ...createUserData,
        password: passwordhashed,
      });

      // Save the user to the database
      const userCreated = await this.userRepository.save(data);

      // Create an empty profile associated with the newly created user
      const userWithProfile =   await this.profileService.createEmptyProfile(userCreated.id);

      // Create a JWT token for authentication
      const payload = { id: userCreated.id, role: userCreated.role };
      const token = await this.jwtService.signAsync(payload);

      // Return the token and the newly created user
      return {
        token,
        user: userWithProfile,
      };
    } catch (error) {
      // Handle errors and return an error message
      throw new BadRequestException({
        statusCode: 400,
        message: {
          Error: [`Error: ${error}`],
        },
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.UserQueryService.findOne(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    if (updateUserDto.role) {
      throw new BadRequestException('You cannot modify your "role".');
    }

    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }






  async remove(id: string): Promise<User> {
    const user = await this.UserQueryService.findOne(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return await this.userRepository.remove(user);
  }

  async findbyEmailWithPassword(email: string) {
    try {
      return this.userRepository.findOne({
        where: { email },
        select: ["id", "name", 'lastname', "password", "email", 'createdAt', 'dateOfBirth', 'gender', 'updatedAt', 'username', 'role']
      });
    } catch (error) {
      throw new Error(`Error : ${error}`);
    }
  }

  async softDeleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }
}
