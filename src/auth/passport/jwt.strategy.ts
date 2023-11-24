import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwtPayload } from './jwt-payload.interface';
import { UserQueryService } from 'users/users-query-service';
import { UsersService } from 'users/users.service';
import { User } from '../../users/entities/user.entity';
import { jwtConstants } from '../constants/jwt-constants';

export interface jwtDataInterface {
  email: string;
  role: string;
  id: string
};


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: UsersService,
    private UserQueryService: UserQueryService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret, // Reemplaza con tu clave secreta
    });
  }

  async validate(payload: jwtDataInterface): Promise<User> {
    const user = await this.UserQueryService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
