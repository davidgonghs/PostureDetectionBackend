import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Feedback } from "./entities/feedback.entity";

@Injectable()
export class FeedbackService {

  constructor(
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>,
  ) {}
  create(createFeedbackDto: CreateFeedbackDto) {

    // convert createFeedbackDto to Feedback
    let feedback = new Feedback(createFeedbackDto.title,
      createFeedbackDto.parent_id,
      createFeedbackDto.user_id,
      createFeedbackDto.admin_id,
      createFeedbackDto.content,
      createFeedbackDto.create_at,
      createFeedbackDto.update_at,
      createFeedbackDto.status);

    return this.feedbackRepository.save(feedback);
  }

  async findAll(page: number, pageSize: number) {
    const [feedback, totalItems] = await this.feedbackRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return { feedback, page,totalItems, totalPages };
  }

  async findOne(id: number) {
    return await this.feedbackRepository.findOne({ where: { id: id } })
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    // find feedback by id
    let feedback = this.findOne(id);
    if (!feedback) {
      throw new Error("Feedback not found");
    }

    // update feedback
    updateFeedbackDto.update_at = Date.now();
    return await this.feedbackRepository.save(updateFeedbackDto);
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }

  async count() {
    return await this.feedbackRepository.countBy({parent_id:0});
  }
}
