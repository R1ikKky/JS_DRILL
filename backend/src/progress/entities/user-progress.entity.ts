import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 20 })
  track: string;

  @Column({ length: 50 })
  topic: string;

  @Column({ length: 10 })
  difficulty: string;

  @Column({ length: 10 })
  mode: string;

  @Column({ length: 15 })
  verdict: string;

  @Column({ default: 0 })
  xpAwarded: number;

  @CreateDateColumn()
  answeredAt: Date;
}
