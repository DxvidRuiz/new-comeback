import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';


export class LoginUserDto {


    @ValidateIf((o) => o.username === undefined)
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'Invalid email.' })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
