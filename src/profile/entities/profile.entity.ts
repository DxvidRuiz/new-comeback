// profile.entity.ts
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: true })
    imageRoute: string | null;
    @Column({ nullable: true })
    Description: string | null;
    @OneToOne(type => User, user => user.profile)
    @JoinColumn()
    user: User;
}
