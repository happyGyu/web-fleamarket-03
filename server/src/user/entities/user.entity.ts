import { Product } from './../../product/entities/product.entity';
import { OAuthOriginEnum } from 'src/common/enums';
import { UserRegion } from 'src/region/entities/userRegion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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

  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];
}
