import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { log } from 'console';

@Injectable()
export class EmailStrategy extends PassportStrategy(Strategy, 'email') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Use 'email' as the identifier
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: any, email: string, password: string) {
    log('EmailStrategy.validate');
    log(email);
    log(password);

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
