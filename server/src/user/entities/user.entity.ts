import { OAuthOriginEnum } from 'src/common/enums/oAuthOrigin.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
