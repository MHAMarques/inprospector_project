import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('prospects')
class Prospect {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length:100 })
    name: string;

    @Column({ length:100 })
    last_name: string;

    @Column({ length:100 })
    email: string;

    @Column({ length:15 })
    phone: string;

    @Column({length: 250,})
    linkedin: string;

    @Column({length: 250,})
    company: string;

    @Column({length: 250,})
    job_title: string;

    @Column({length: 960,})
    information: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.prospects)
    user: User;

}

export {Prospect};
