// user-query.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserQueryService {
    constructor(
        // @Inject(forwardRef(() => UsersService))
        // private readonly usersService: UsersService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>

    ) { }


    async findOne(id: string): Promise<User | undefined> {
        return await this.userRepository.findOneBy({ id });
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

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Puedes agregar más funciones de consulta según sea necesario
}
