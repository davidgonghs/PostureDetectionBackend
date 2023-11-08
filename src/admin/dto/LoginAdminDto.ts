import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AdminLoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}