import { IRegion } from './region';
import { IUser } from './user';

type SalesStatusType = 'sale' | 'reserved' | 'sold';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  region: IRegion;
  salesStatus: SalesStatusType;
  createdAt: string;
  updatedAt: string;
  thumbnail: JSON;
  description: string;
  views: number;
  writer: IUser;
}

export interface ILikedUser {
  productId: number;
  userId: number;
}

export interface GetRegionProductAPIDto
  extends Pick<IProduct, 'id' | 'name' | 'price' | 'region' | 'salesStatus' | 'createdAt'> {
  thumbnail: string;
  likedUsers: ILikedUser[];
}
