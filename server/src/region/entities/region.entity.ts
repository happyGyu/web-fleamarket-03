import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import UserRegion from './userRegion.entity';

@Entity()
export default class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  address: string;

  @OneToMany(() => UserRegion, (userRegion) => userRegion.region)
  users: UserRegion[];
}
