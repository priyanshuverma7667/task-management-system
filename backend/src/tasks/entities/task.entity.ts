import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('tasks')
export class Task {
    // fields go here
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ default: 'todo' })
    status!: string;

    @Column({ default: 'no_priority' })
    priority!: string;

    @Column({ nullable: true, type: 'datetime' })
    dueDate!: Date;
    
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column()
    userId!: string;

}