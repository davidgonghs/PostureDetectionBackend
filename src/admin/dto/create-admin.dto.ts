import { Column } from "typeorm";

export class CreateAdminDto {
  username: string;
  password: string;
  email: string;
  role: string;
  img: string;
  create_at: Date;
  update_at: Date;

  constructor(a : string , b : string );
  constructor(a : string , b : string , c : string );
  constructor(a : string , b : string , c : string , d : string );
  constructor(a : string , b : string , c : string , d : string , e : string );

  constructor(username: string, password? : string, email? : string, role? : string, img? : string)
  {
    this.username = username;
    this.password = password ?? "123456789";
    this.email = email ?? username + "@posture_detection.com";
    this.role = role ?? "admin";
    this.img = img ?? "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";
    this.create_at = new Date()
    this.update_at = new Date()
  }
}
