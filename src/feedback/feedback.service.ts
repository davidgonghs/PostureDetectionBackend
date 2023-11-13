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
  async create(createFeedbackDto: CreateFeedbackDto) {

    // convert createFeedbackDto to Feedback
    let feedback = new Feedback(createFeedbackDto.title,
      createFeedbackDto.parent_id,
      createFeedbackDto.user_id,
      createFeedbackDto.admin_id,
      createFeedbackDto.content,
      createFeedbackDto.created_at,
      createFeedbackDto.updated_at,
      createFeedbackDto.status);

    return await this.feedbackRepository.save(feedback);
  }

  async findAll(page: number, pageSize: number) {
    const [feedback, totalItems] = await this.feedbackRepository.findAndCount({
      where: {parent_id:0},
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { created_at: "DESC" },
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
    return await this.feedbackRepository.countBy({parent_id:0, status:0});
  }

  //findByParentId
  async findByParentId(parent_id: number) {
    return await this.feedbackRepository.find({
      where: [{ parent_id: parent_id },{ id: parent_id }],
      order: { created_at: "ASC" },
      }
    );
  }
}
