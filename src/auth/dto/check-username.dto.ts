import {
  IsNotEmpty,
  MaxLength
} from '@nestjs/class-validator';

export class CheckUsernameDto {
  @IsNotEmpty() // Campo no debe estar vacío
  @MaxLength(255)
  username: string;

}
