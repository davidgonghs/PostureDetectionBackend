import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string

  @Column()
  img: string;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;

}
