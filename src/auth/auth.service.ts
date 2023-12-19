import { Injectable } from '@nestjs/common';
import { comparePassword } from "../utils/processPassword";
import { JwtService } from '@nestjs/jwt';
import { AdminService } from "../admin/admin.service";
import { Admin } from 'src/admin/entities/admin.entity';
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { UserLoginDto } from "../user/dto/user-login.dto";
import { UserLog } from "../user-log/model/userlog.model";
import { UserLogService } from "../user-log/user-log.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly userLogService: UserLogService,
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

  async validateUser(email: string, password: string) {
    console.log("validateUser", email, password);
    const user = await this.userService.findOneByEmail(email);
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

  async userLogin(user: UserLoginDto,ip: string) {
    const payload = {
      email: user.email,
      sub: {
        email: user.email,
      },
    };

    let u : User = await this.userService.findOneByEmail(user.email);
    // without password
    const { password, ...result } = u;

    await this.userLogService.create(new UserLog(u.id,u.username,u.email,ip));

    return {
      ...u,
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

