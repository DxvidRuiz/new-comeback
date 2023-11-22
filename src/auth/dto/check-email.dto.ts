import { IsEmail, IsNotEmpty, Matches, MaxLength } from '@nestjs/class-validator';

export class CheckEmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  @MaxLength(255)
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Invalid email address',
  })
  email: string;
}
