import { SalesStatusEnum } from './../../common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from 'src/user/entities/user.entity';
import { Region } from 'src/region/entities/region.entity';
import { Like } from './like.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'json' })
  thumbnails: string[];

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'int' })
  view: number;

  @Column({ type: 'enum', enum: SalesStatusEnum })
  salesStatus: string;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'int' })
  sellerId: number;

  @Column({ type: 'int' })
  regionId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @ManyToOne(() => Region, (region) => region.products)
  @JoinColumn({ name: 'region_id' })
  region: Region;

  @OneToMany(() => Like, (like) => like.product)
  likedUsers: Like[];
}
