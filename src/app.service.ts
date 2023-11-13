import { Injectable } from '@nestjs/common';
import { FeedbackService } from "./feedback/feedback.service";
import { UserService } from "./user/user.service";
import { UserLogService } from "./user-log/user-log.service";

@Injectable()
export class AppService {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly userService: UserService,
    private readonly userLogService: UserLogService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async count() {

    // get today date and tmr date, careful about year, month, day
    let today = new Date()
    let tmr = new Date()
    tmr.setDate(today.getDate() + 1)
    let start = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let end = tmr.getFullYear() + '-' + (tmr.getMonth() + 1) + '-' + tmr.getDate()

    let countUser = await this.userService.countUser(start, end)

    let countFeedback = await this.feedbackService.count();

    let activityUser = await this.userLogService.findActivityToday()

    return {
      feedback: countFeedback.total,
      totalUser: countUser.totalUser,
      newUser: countUser.checkUser,
      activityUser: activityUser.todayActivity,
    };
  }



  async dataRevenueArea() {
    let activityUser = await this.userLogService.findActivityLastWeek()
    let countUser = await this.userService.countUserLastWeek()
    let date = []
    let userNumber = []
    let activityNumber = []
    activityUser.countsByDate.forEach(element => {
      date.push(element.date)
      activityNumber.push(element.count)
    });
    countUser.userCounts.forEach(element => {
      userNumber.push(element.userNumber)
    });
    return {
        date: date,
        userNumber: userNumber,
        activityNumber: activityNumber
    };
  }






}
