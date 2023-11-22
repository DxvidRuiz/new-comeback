import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { RolesEnum } from '../../common/roles.enum';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: "" })
  name: string;

  @Column({})
  lastname: string;

  @Column({})
  gender: string;

  @Column({})
  dateOfBirth: string;

  @Column({ unique: true, })
  email: string;

  @Column({ default: RolesEnum.User, type: "enum", enum: RolesEnum })
  role: RolesEnum;

  @Exclude()
  @Column({ nullable: false, select: false })
  password: string;

  @OneToMany(type => Post, post => post.user)

  posts: Post[];


  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deletedAt: Date;
}
