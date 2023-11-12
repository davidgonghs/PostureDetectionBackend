import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createResponse } from '../utils/create-response';
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return createResponse(200, "Success", "")
    } catch (e) {
      return createResponse(500, e.message, "")
    }
    return
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const users = await this.userService.findAll(page, pageSize);
    return createResponse(200, "Success", users)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    let webUser = await this.userService.findOne(id);
    try{
      if (webUser) {
        return createResponse(200, "Success", webUser)
      }
    }catch (e) {
      return createResponse(500,  e.message,"")
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let webUser = await this.userService.update(+id, updateUserDto);
    try{
      if (webUser) {
        return createResponse(200, "Success", webUser)
      }
    } catch (e) {
      return createResponse(500,  e.message,"")
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try{
      if (await this.userService.remove(id)) {
        return createResponse(200, "Success", "")
      }
    }catch (e){
      return createResponse(500,  e.message,"")
    }
  }

//   count total user
  //@UseGuards(AuthGuard)
  @Get('count/user')
  async countUser(
    @Query('start') start: string,
    @Query('end') end: string
  ) {
    try {
      return createResponse(200, "Success", await this.userService.countUser(start,end))
    } catch (e) {
      return createResponse(500, e.message)
    }
  }

  //get last week how many new user and old user by day
  //@UseGuards(AuthGuard)
  @Get('count/user/lastweek')
  async countUserLastWeek() {
    try {
      return createResponse(200, "Success", await this.userService.countUserLastWeek())
    } catch (e) {
      return createResponse(500, e.message)
    }
  }



}
