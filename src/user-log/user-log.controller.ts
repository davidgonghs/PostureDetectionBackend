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

  @Post()
  create(@Body() userLog: UserLog) {
    return this.userLogService.create(userLog);
  }

  @Get()
  findAll() {
    return this.userLogService.findAllUserLog();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLogService.findByUserId(+id);
  }

  // get activity user count
  @UseGuards(AuthGuard)
  @Get('activity/:start/:end')
  async findActivity(@Param('start') start: number, @Param('end') end: number) {
    return createResponse(200, "Success", { count: await this.userLogService.findActivity(start, end) });
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userLogService.remove(+id);
  // }
}
