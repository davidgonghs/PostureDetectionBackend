import { Admin, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateFeedbackDto } from "../dto/create-feedback.dto";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  parent_id: number;//if parent_id = 0 then it is a parent feedback

  @Column()
  user_id: number;

  @Column()
  admin_id: number;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  status: number;  // 0: new, 1: read, 2: done


  constructor(title: string, parent_id: number, user_id: number, admin_id: number, content: string, created_at: Date, updated_at: Date, status: number) {
    this.title = title;
    this.parent_id = parent_id?parent_id:0;
    this.user_id = user_id?user_id:0;
    this.admin_id = admin_id?admin_id:0;
    this.content = content;
    this.created_at = created_at?created_at:new Date();
    this.updated_at = updated_at?updated_at:new Date();
    this.status = status?status:0;
  }

}
