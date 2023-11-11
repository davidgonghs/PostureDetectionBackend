import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminLoginDto } from "./dto/LoginAdminDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";
import { processPassword, comparePassword } from "../utils/processPassword";


//use bcryptjs


// const bcrypt = require("bcryptjs");
// var salt = bcrypt.genSaltSync(16);

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin: Admin = new Admin(createAdminDto.username, createAdminDto.password);
    admin.password = await processPassword(admin.password);
   // const user = await this.adminRepository.create(admin);
    await this.adminRepository.save(admin);
    const { password, ...result } = admin;
    return admin;
  }

  // findOneWithUserName
  async findOneWithUserName(username:string): Promise<Admin> {
    const admin: Admin = new Admin(username);
    return await this.adminRepository.findOneBy({username: admin.username});
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async login(username:string, password:string): Promise<boolean> {
    const admin: Admin = new Admin(username);

    //find user by username
    const adminUser = await this.adminRepository.findOneBy({username: admin.username});
    if (adminUser) {
      const result = await comparePassword(password, adminUser.password);
      if (result) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }




}
