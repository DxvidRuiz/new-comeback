import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { CheckUsernameDto } from './dto/check-username.dto';

@Injectable()
export class ValidationsServiceService {
    constructor(
        private readonly userService: UsersService,

    ) { }

    async checkemail(emailToCheck: CheckEmailDto) {
        const emailExists = await this.userService.findOnebyEmail(emailToCheck.email);

        if (emailExists) {
            // Correo electrónico encontrado, lanzar 200 OK
            return {
                statusCode: 200,
                message: 'Email found',
            };
        }

        // Correo electrónico no encontrado, devolver 400 Bad Request
        throw new BadRequestException({
            statusCode: 400,
            message: {
                error: 'Email not found',
            },
        });
    }

    async checkusername(usernameToCheck: CheckUsernameDto) {
        const usernameExists = await this.userService.findOnebyUsername(usernameToCheck.username)

        if (usernameExists) {
            // Correo electrónico no encontrado, devolver 200 OK
            return {
                statusCode: 200,
                message: 'Username found',
            };
        }

        // Correo electrónico encontrado, lanzar 400 Bad Request
        throw new BadRequestException({
            statusCode: 400,
            message: {
                error: 'Username not found',
            },
        });
    }
}
