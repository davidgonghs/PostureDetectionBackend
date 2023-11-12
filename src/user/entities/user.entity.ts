import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { WebUserDto } from '../dto/web-user.dto';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Unique(["email"])
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


  constructor(a : string , b : string );
  constructor(a : string , b : string , c : string );
  constructor(a : string , b : string , c : string , d : string );
  constructor(a : string , b : string , c : string , d : string, e : string );
  constructor(username: string, password? : string, email? : string,  img? : string)
  {
    this.username = username;
    this.password = password ?? "123456789";
    this.email = email ?? username + "@posture_detection.com";
    this.img = img ?? "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";
    this.create_at = new Date()
    this.update_at = new Date()
  }

//   create function to webUserDto
  toWeb() {
    let webUser = new WebUserDto();
    webUser.id = this.id;
    webUser.email = this.email;
    webUser.username = this.username;
    webUser.img = this.img;
    webUser.create_at = this.create_at;
    webUser.update_at = this.update_at;
    return webUser;
  }

}
