// import {
//   IsNotEmpty,
//   IsString,
//   Length,
//   Matches,
//   MinLength,
// } from '@nestjs/class-validator';
// import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

// @Entity()
// export class Auth {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column({unique: true})
//   username: string;
//   @Column()
//   @Length(1, 128) // Ejemplo de limitación de longitud
//   @IsNotEmpty({ message: 'Password cannot be empty.' })
//   password: string;

//   // Otros campos de autenticación
// }
