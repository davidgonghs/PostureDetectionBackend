import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { log } from 'console';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField:'password',
      passReqToCallback: true,
    });
  }

  async validate(req: any,username: string, password: string) {

    log('LocalStrategy.validate');
    log(username);
    log(password);

    const user = await this.authService.validateAdminUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
