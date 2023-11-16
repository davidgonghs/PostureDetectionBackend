import { Injectable } from "@nestjs/common";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Feedback } from "./entities/feedback.entity";

@Injectable()
export class FeedbackService {

  constructor(
    @InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>
  ) {
  }

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
      where: { parent_id: 0 },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { created_at: "DESC" }
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return { feedback, page, totalItems, totalPages };
  }

  async findOne(id: number) {
    return await this.feedbackRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    // find feedback by id
    try{
      let feedback = await this.feedbackRepository.findOne({ where: { id: id } });
      if (!feedback) {
        throw new Error("Feedback not found");
      }

      // update feedback
      feedback.updated_at = new Date;
      feedback.status = updateFeedbackDto.status;
      await this.feedbackRepository.save(feedback);
      return true;
    }catch (e) {
      throw new Error(e.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }

  async count() {
    return { total: await this.feedbackRepository.countBy({ parent_id: 0, status: 0 }) };
  }

  //findByParentId
  async findByParentId(parent_id: number) {
    try {
      const feedbackData = await this.feedbackRepository.query(`
          SELECT feedback.*,
                 admin.img      as admin_img,
                 admin.username as admin_username,
                 u.img          as user_img,
                 u.username     as user_username
          FROM feedback
                   LEFT JOIN admin ON feedback.admin_id = admin.id
                   LEFT JOIN "user" AS u ON feedback.user_id = u.id
          WHERE (feedback.parent_id = ${parent_id} OR feedback.id = ${parent_id})
          ORDER BY feedback.created_at ASC
      `);

      // Assuming that the returned data structure is compatible with your Feedback entity
      return feedbackData;
    } catch (error) {
      console.error("Error executing raw SQL query:", error);
      throw error;
    }
  }
}
