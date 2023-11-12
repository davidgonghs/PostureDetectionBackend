import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards
} from "@nestjs/common";
import { UserLogService } from './user-log.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { UpdateUserLogDto } from './dto/update-user-log.dto';
import { UserLog } from "./model/userlog.model";
import { AuthGuard } from "../auth/guards/auth.guard";
import { createResponse } from "../utils/create-response";

@Controller('user-log')
export class UserLogController {
  constructor(private readonly userLogService: UserLogService) {}

  //@UseGuards(AuthGuard)
  @Post()
  create(@Body() userLog: UserLog) {
    try{
      this.userLogService.create(userLog)
      createResponse(200, "Success")
    }catch (e) {
      return createResponse(500,  e.message)
    }
  }

  //@UseGuards(AuthGuard)
  @Get()
  async findAll() {
    try {
      return createResponse(200, "Success", await this.userLogService.findAllUserLog())
    } catch (e) {
      return createResponse(500, e.message)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      return createResponse(200, "Success", await this.userLogService.findByUserId(+id))
    } catch (e) {
      return createResponse(500, e.message)
    }
  }

  // get activity user count
  //@UseGuards(AuthGuard)
  @Get('activity/:start/:end')
  async findActivity(@Param('start') start: string, @Param('end') end: string) {
    try{
      return createResponse(200, "Success", await this.userLogService.findActivity(start, end))
    }catch (e) {
      return createResponse(500,  e.message)
    }
  }




}
