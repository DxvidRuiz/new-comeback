import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // Importa Repository de TypeORM
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    const exist = await  this.findOneEmai(createUserDto.email)
        if(exist){
          throw new BadRequestException({
            statusCode: 400,
            message: {
              email: ['Email already exists'],
            },
          })
        }
    
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new Error(`Error:  ${error}`);
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

  async findOneEmai(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
