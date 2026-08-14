import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from  'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 'Guest' })
  name!: string;

  @Column({ default: true })
  isGuest!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}