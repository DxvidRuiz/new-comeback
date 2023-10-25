import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from '@nestjs/class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Length(1, 30)
  @Matches(/^[a-zA-Z0-9.]+$/, {
    message: 'Username can only contain letters, numbers and periods .',
  })
  username: string;

  @Column()
  @IsNotEmpty() // Campo no debe estar vacío
  @Length(1, 50) // Ejemplo de limitación de longitud
  name: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 50) // Ejemplo de limitación de longitud
  lastname: string;

  @IsInt({ message: 'Age must be an integer.' })
  @Min(0, { message: 'Age must be greater than or equal to 0.' })
  @Max(120, { message: 'Age must not exceed 120 years.' })
  @IsPositive({ message: 'Age must be a positive number.' })
  @IsNotEmpty({ message: 'Age cannot be empty.' })
  age: number;

  @Column()
  @IsNotEmpty() // Campo no debe estar vacío
  @IsEmail() // Debe ser una dirección de correo electrónico válida
  @Max(255)
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


  @IsString({ message: 'Biography must be a string.' })
  @MaxLength(200, { message: 'Biography cannot exceed 200 characters.' })
  @IsOptional()
  biography: string;

  
  @Column({ nullable: true }) // El campo de foto de perfil es opcional
  @IsOptional()
  @IsUrl({}, { message: 'Profile picture must be a valid URL.' })
  profilePicture: string;
}
