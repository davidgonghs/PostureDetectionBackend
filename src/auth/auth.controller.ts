import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt-auth.guard";
import { JwtGuard } from "./guards/jwt-auth.guard";
import { AdminService } from "../admin/admin.service";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { createResponse } from "../utils/create-response";
import { AuthGuard } from "./guards/auth.guard";
import { EmailAuthGuard } from "./guards/email.guard";


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async adminLogin(@Request() req) {
    console.log(req.user);
    try{
      return createResponse(200, "success", await this.authService.login(req.user));
    }catch (e) {
      return createResponse(500, e.message)
    }
  }

  @UseGuards(EmailAuthGuard)
  @Post('user-login')
  async userLogin(@Request() req) {
    // console.log(req.body);
    // get IP
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
    try{
      return createResponse(200, "success", await this.authService.userLogin(req.user,ip));
    }catch (e) {
      return createResponse(500, e.message)
    }
  }



  // @Post('register')
  // async registerUser(@Body() createUserDto: CreateUserDto) {
  //   return await this.userService.create(createUserDto);
  // }

  // createAdmin
  @Post('createAdmin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  // verify

  @UseGuards(AuthGuard)
  @Get('verify')
  async verify() {
    return createResponse(200, "success", "");
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
