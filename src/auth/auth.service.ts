import { Injectable } from '@nestjs/common';
import { comparePassword } from "../utils/processPassword";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { JwtService } from '@nestjs/jwt';
import { AdminService } from "../admin/admin.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.adminService.findOneWithUserName(username);
    if (user && (await comparePassword(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user.username,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user.username,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}

