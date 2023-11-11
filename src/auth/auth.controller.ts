import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';

import { UserService } from "../user/user.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";
import { AdminService } from "../admin/admin.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private adminService: AdminService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // createAdmin
  @Post('createAdmin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
