import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogController } from './user-log.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserLog } from "./model/userlog.model";

@Module({
  imports: [TypeOrmModule.forFeature([UserLog])],
  controllers: [UserLogController],
  providers: [UserLogService],
  exports: [UserLogService]

})
export class UserLogModule {}
