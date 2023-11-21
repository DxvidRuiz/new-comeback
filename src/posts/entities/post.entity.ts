import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

    @Column()
    description: string;

    @ManyToOne(type => User, user => user.posts)
    user: User;

    // ... otras columnas
}