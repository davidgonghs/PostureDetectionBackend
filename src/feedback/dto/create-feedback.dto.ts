import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateFeedbackDto {

  title: string;

  parent_id: number;//if parent_id = 0 then it is a parent feedback

  user_id: number;

  admin_id: number;

  content: string;

  create_at: number;

  update_at: number;

  status: number;  // 0: new, 1: read, 2: done

  constructor(title: string, parent_id: number, user_id: number, admin_id: number, content: string, create_at: number, update_at: number, status: number) {
    this.title = title;
    this.parent_id = parent_id?parent_id:0;
    this.user_id = user_id?user_id:0;
    this.admin_id = admin_id?admin_id:0
    this.content = content;
    this.create_at = create_at?create_at:Date.now();
    this.update_at = update_at?update_at:Date.now();
    this.status = status?status:0;
  }
}
