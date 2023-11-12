import { Injectable } from '@nestjs/common';
import { CreateUserLogDto } from './dto/create-user-log.dto';
import { UpdateUserLogDto } from './dto/update-user-log.dto';

import putUserLog from "../dynamodb/userlog/putUserLog";
import getUserLog from "../dynamodb/userlog/getUserLog";
import { UserLog } from "./model/userlog.model";
@Injectable()
export class UserLogService {

  create(userLog: UserLog) {
    userLog.login_date = Date.now();
    // login_date = new Date().toISOString();
    // const userLog = new UserLog(userId, login_date, user_name, user_email, ip_address, platform, system);
    console.log(userLog);
    putUserLog(userLog).then(r => console.log(r));
    return "Success"
  }

  findAllUserLog() {
    return getUserLog.getAllUserLogs()
  }

  findByUserId(id: number) {
    return getUserLog.getUserLogsByUserId(id)
  }

  remove(id: number, login_date: string) {
    return `This action removes a #${id} userLog`;
  }



  //findActivity
  findActivity(start:number, end:number) {
    return getUserLog.getActivityUser(start, end)
  }




}
