import { Injectable } from '@nestjs/common';
import { comparePassword } from "../utils/processPassword";
import { JwtService } from '@nestjs/jwt';
import { AdminService } from "../admin/admin.service";
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateAdminUser(username: string, password: string) {
    const user = await this.adminService.findOneWithUserName(username);
    if (user && (await comparePassword(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //validateUserById
  async validateAdminUserByUsername(username: string) {
    const user = await this.adminService.findOneWithUserName(username);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }



  async login(user: Admin) {
    const payload = {
      username: user.username,
      sub: {
        username: user.username,
      },
    };

    return {
      ...user,
      accessToken: await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET }),
      // refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: Admin) {
    const payload = {
      username: user.username,
      sub: {
        username: user.username,
      },
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

