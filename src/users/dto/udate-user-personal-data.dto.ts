import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
} from '@nestjs/class-validator';

export class UpdateUserPersonalDataDto {
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

  // Puedes agregar otros campos que permitas modificar

}
