import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
    })
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column('text', {
        name: 'emails',
        nullable: false,
        array: true,
    })
    emails: string[];

    @Column({
        name: 'password',
        nullable: true,
    })
    password: string;

    @Column('text', {
        name: 'role',
        nullable: false,
        array: true,
    })
    role: string[];
}
