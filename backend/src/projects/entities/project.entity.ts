import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: 'no_priority' })
  priority!: string;

  @Column({ nullable: true, type: 'datetime' })
  dueDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  userId!: string;
}