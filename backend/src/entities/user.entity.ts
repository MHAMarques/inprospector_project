import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import { Prospect } from "./prospect.entity";
import { hashSync } from "bcrypt";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length:100 })
    name: string;

    @Column({ length:100 })
    last_name: string;

    @Column({ length:100, unique: true })
    email: string;

    @Column({ length:15 })
    phone: string;

    @Column({length: 120,})
    password: string;

    @Column({default: false})
    isAdm: boolean;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Prospect, (prospects) => prospects.user)
    prospects: Prospect[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){this.password = hashSync(this.password, 10)};
}

export {User};
