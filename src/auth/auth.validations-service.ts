import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserQueryService } from 'users/users-query-service';
import { CheckEmailDto } from './dto/check-email.dto';
import { CheckUsernameDto } from './dto/check-username.dto';

@Injectable()
export class ValidationsServiceService {
    constructor(
        @Inject(forwardRef(() => UserQueryService))

        private readonly userQueryService: UserQueryService,

    ) { }

    async checkemail(emailToCheck: CheckEmailDto) {
        const emailExists = await this.userQueryService.findOnebyEmail(emailToCheck.email);

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
        const usernameExists = await this.userQueryService.findOnebyUsername(usernameToCheck.username)

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
