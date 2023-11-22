import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector
        // jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = this.reflector.getAllAndOverride(ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()])

        console.log(roles);
        if (!roles) {
            return true
        }
        const { user } = context.switchToHttp().getRequest();

        return roles === user.role


    }
}