import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength
} from '@nestjs/class-validator';

export class RegisterUserDto {
  @IsUUID(undefined, { each: true })
  id: string;

  @Length(1, 30)
  @Matches(/^[a-zA-Z0-9._-]+$/, {
    message: 'Username can only contain letters, numbers and periods .',
  })
  username: string;

  @Length(1, 50) // Ejemplo de limitación de longitud
  name: string;

  @Length(1, 50) // Ejemplo de limitación de longitud
  lastname: string;

  @IsNotEmpty({ message: 'Age cannot be empty.' })
  @IsDateString()

  dateOfBirth: string;

  @IsNotEmpty() // Campo no debe estar vacío
  @IsEmail() // Debe ser una dirección de correo electrónico válida
  @MaxLength(255)
  email: string;
  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  @Length(1, 128) // Ejemplo de limitación de longitud
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;

}
