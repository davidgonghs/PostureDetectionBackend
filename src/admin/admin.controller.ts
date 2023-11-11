import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminLoginDto } from "./dto/LoginAdminDto";
import { createResponse } from '../utils/create-response';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Post(':login')
  login(@Body() adminLoginDto: AdminLoginDto) {
    // this.adminService.login(adminLoginDto.username, adminLoginDto.password);
    let reponse = createResponse(200, "Login success", null);
    if(!this.adminService.login(adminLoginDto.username, adminLoginDto.password)){
      reponse = createResponse(400, "Login failed/Can not find User/Password wrong", null);
    }
    return reponse;
  }
}
