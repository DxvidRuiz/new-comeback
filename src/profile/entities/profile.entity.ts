// profile.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  profilePhotoRoute: string | null;

  @Column({ nullable: true })
  imageRoute: string | null;

  @Column({ nullable: true })
  Description: string | null;

  @Column({ nullable: true })
  userId: string; // Nuevo campo para almacenar el ID del usuario

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'userId' })
  user: User;
}
