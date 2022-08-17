import { OAuthOriginEnum } from 'src/common/enums/oAuthOrigin.enum';
import UserRegion from 'src/region/entities/userRegion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'enum', enum: OAuthOriginEnum })
  oAuthOrigin: string;

  @Column({ type: 'varchar' })
  oAuthId: string;

  @OneToMany(() => UserRegion, (userRegion) => userRegion.user)
  regions: UserRegion[];
}
