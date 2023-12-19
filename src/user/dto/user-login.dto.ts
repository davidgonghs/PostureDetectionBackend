
export class UserLoginDto {

  email: string;

  password: string

  constructor(a : string , b : string);
  constructor(password? : string, email? : string)
  {
    this.password = password;
    this.email = email;
  }
}
