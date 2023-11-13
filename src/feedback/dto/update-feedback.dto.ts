import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackDto } from './create-feedback.dto';

export class UpdateFeedbackDto {

  id: number;

  updated_at: Date;

  status: number;  // 0: new, 1: read, 2: done
}
