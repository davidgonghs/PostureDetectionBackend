import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { Admin } from "../admin/entities/admin.entity";
import { AdminService } from "../admin/admin.service";
import { AuthGuard } from "./guards/auth.guard";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { EmailStrategy } from "./strategies/email-strategy";
import { UserLogService } from "../user-log/user-log.service";

@Module({
  providers: [
    AuthService,
    AdminService,
    UserService,
    UserLogService,
    AuthGuard,
    LocalStrategy,
    EmailStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    TypeOrmModule.forFeature([Admin, User]),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AuthModule {}
