import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';
import { IsIn, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsUUID("4")
  id: string;

  @Length(1, 30, { message: 'Username must be between 1 and 30 characters' })
  @Matches(/^^[a-zA-Z0-9._-]+$/, {
    message: 'Username can only contain letters, numbers, periods (.), underscores (_) and hyphens (-).',
  })
  username: string;

  @Length(1, 50)
  name: string;

  @Length(1, 50)
  lastname: string;

  @IsNotEmpty({ message: 'Gender cannot be empty.' })
  @IsString({ message: 'Gender must be a string.' })
  @IsIn(['male', 'female', 'nonbinary'], {
    message: 'Invalid gender. Accepted values are Male, Female, Nonbinary.',
  })
  @Length(1, 20)
  gender: string;

  @IsNotEmpty({ message: 'Age cannot be empty.' })
  @IsDateString()
  dateOfBirth: string;
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Length(1, 128)
  @IsStrongPassword()  // Ejemplo de limitación de longitud
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;

}
