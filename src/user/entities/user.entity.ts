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
  phone: string;

  @Column()
  gender: string;

  @Column()
  region: string;

  @Column()
  birthDate: string;

  @Column()
  create_at: Date;

  @Column()
  update_at: Date;


  constructor(a : string , b : string );
  constructor(a : string , b : string , c : string );
  constructor(a : string , b : string , c : string , d : string );
  constructor(a : string , b : string , c : string , d : string, e : string );
  constructor(a : string , b : string , c : string , d : string, e : string, f : string );
  constructor(a : string , b : string , c : string , d : string, e : string, f : string, g : string );
  constructor(a : string , b : string , c : string , d : string, e : string, f : string, g : string, h : string );
  constructor(a : string , b : string , c : string , d : string, e : string, f : string, g : string, h : string, i : string );
  constructor(a : string , b : string , c : string , d : string, e : string, f : string, g : string, h : string, i : string, j : string );
  constructor(a : string , b : string , c : string , d : string, e : string, f : string, g : string, h : string, i : string, j : string, k : string );
  constructor(a : string , b : string , c : string , d : string, e : string, f : string, g : string, h : string, i : string, j : string, k : string, l : string );


  constructor(username: string, password? : string, email? : string,  img? : string, phone?: string, gender?: string, region?: string, birthDate?: string)
  {
    // check if user is empty and email is not empty then username = email
    if(username == "" && email != ""){
      username = email;
    }
    this.username = username;
    this.password = password ?? "123456789";

    this.email = email ?? username + "@posture_detection.com";
    this.img = img ?? "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";
    this.phone = phone ?? "";
    this.gender = gender?? "";
    this.region = region?? "";
    this.birthDate = birthDate?? "";

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
