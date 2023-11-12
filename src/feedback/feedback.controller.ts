import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from "@nestjs/common";
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { AuthGuard } from "../auth/guards/auth.guard";
import { createResponse } from "../utils/create-response";

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    let feedback = await this.feedbackService.create(createFeedbackDto);
    return createResponse(200, "Success", feedback);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    const feedback = await this.feedbackService.findAll(page, pageSize);
    return createResponse(200, "Success", feedback)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    let feedback = await this.feedbackService.findOne(id);
    try{
      if (feedback) {
        return createResponse(200, "Success", feedback)
      }
    }catch (e) {
      return createResponse(500,  e.message,"")
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    try{
      if (this.feedbackService.update(id, updateFeedbackDto)) {
        return createResponse(200, "Success", "")
      }
    }catch (e) {
      return createResponse(500,  e.message,"")
    }
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Get('count')
  async count() {
    return createResponse(200, "Success", { count: await this.feedbackService.count() });
  }
}
