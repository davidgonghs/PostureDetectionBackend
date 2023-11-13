import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   throw new UnauthorizedException();
    // }
    // try {
    //   console.log('JWT_SECRET:', process.env.JWT_SECRET);
    //   const payload = await this.jwtService.verifyAsync(token, {
    //     secret: process.env.JWT_SECRET,
    //   });
    //   request['user'] = payload;
    // } catch (error) {
    //   console.error('JWT verification error:', error.message);
    //   throw new UnauthorizedException();
    // }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}