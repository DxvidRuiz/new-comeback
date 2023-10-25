import { IsEmail, IsNotEmpty, IsString, MinLength, isNotEmpty, isString, minLength } from "@nestjs/class-validator";

export class CreateUserDto {
  
  @IsString()
  @MinLength(1)    
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
