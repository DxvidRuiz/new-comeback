import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm'; // Importa Repository de TypeORM
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


export interface CreateUserResponse {
  token: string;
  user: User;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService

  ) { }
  async create(createUserData: CreateUserDto): Promise<CreateUserResponse> {

    try {
      const exist = await this.findOnebyEmail(createUserData.email)
      if (exist) {
        throw new BadRequestException({
          statusCode: 400,
          message: {
            email: ['Email already exists'],
          },
        })
      }
      const idExist = await this.findOnebyUsername(createUserData.username)
      if (idExist) {
        throw new BadRequestException({
          statusCode: 400,
          message: {
            Username: ['Username already exists'],
          },
        })
      }
      const passwordhashed = await bcrypt.hash(createUserData.password, 10)
      const data = this.userRepository.create({ ...createUserData, password: passwordhashed })

      const userCreated = await this.userRepository.save(data);
      // JWT creation ----------------------------------------
      const payload = { sub: userCreated.email, role: userCreated.role };
      const token = await this.jwtService.signAsync(payload)

      return {
        token,
        user: userCreated
      };

    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: {
          Error: [`Error : ${error}`]
        }
      })
    }
  }




  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
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
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return await this.userRepository.remove(user);
  }

  async findOnebyEmail(email: string) {
    try {

      return this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new Error(`Error : ${error}`)
    }
  }
  async findOnebyUsername(username: string) {

    try {

      return this.userRepository.findOneBy({ username });
    } catch (error) {
      throw new Error(`Error : ${error}`)

    }
  }
  async findbyEmailWithPassword(email: string) {

    try {

      return this.userRepository.findOne({
        where: { email },
        select: ["id", "name", "password", "email"]
      });
    } catch (error) {
      throw new Error(`Error : ${error}`)

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
