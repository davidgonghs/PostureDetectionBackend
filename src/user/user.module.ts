import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { LocalStrategy } from "../auth/strategies/local-strategy";
import { UserLogService } from "../user-log/user-log.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService,UserLogService],
  exports: [UserService]
})
export class UserModule {}
