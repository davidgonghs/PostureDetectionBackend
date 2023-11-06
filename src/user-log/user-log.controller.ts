import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { UpdateUserLogDto } from './dto/update-user-log.dto';
import { UserLog } from "./model/userlog.model";

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


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userLogService.remove(+id);
  // }
}
