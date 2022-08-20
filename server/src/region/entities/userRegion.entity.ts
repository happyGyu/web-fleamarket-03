import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from './region.entity';

@Entity()
export class UserRegion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  regionId: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => Region, (region) => region.users)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @ManyToOne(() => User, (user) => user.regions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
