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
    console.log(userLog);
    putUserLog(userLog).then(r => console.log(r));
  }

  findAllUserLog() {
    return getUserLog.getAllUserLogs()
  }

  findByUserId(id: number) {
    return getUserLog.getUserLogsByUserId(id)
  }

  //findActivity
  findActivity(start:number, end:number) {
    return getUserLog.getActivityUser(start, end)
  }




}
