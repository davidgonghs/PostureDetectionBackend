import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthGuard } from "./auth/guards/auth.guard";
import { createResponse } from "./utils/create-response";
import { FeedbackService } from "./feedback/feedback.service";
import { UserService } from "./user/user.service";
import { UserLogService } from "./user-log/user-log.service";

@Controller()
export class AppController {
  constructor(
    private appService: AppService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

//   count
  @UseGuards(AuthGuard)
  @Get('count')
  async count() {
    try {
      return createResponse(200, "Success", await this.appService.count())
    }catch (e) {
      return createResponse(500, e.message)
    }
  }

  @UseGuards(AuthGuard)
  @Get('data/revenue/area')
  async dataRevenueArea() {
    try {
      return createResponse(200, "Success", await this.appService.dataRevenueArea())
    }catch (e) {
      return createResponse(500, e.message)
    }
  }
}
