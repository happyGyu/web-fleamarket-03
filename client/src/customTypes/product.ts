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
  thumbnails: JSON;
  description: string;
  views: number;
  seller: IUser;
  likedUsers: ILikedUser[];
}

export interface ILikedUser {
  productId: number;
  userId: number;
}

export interface IProductItem
  extends Pick<
    IProduct,
    'id' | 'name' | 'price' | 'region' | 'salesStatus' | 'createdAt' | 'likedUsers'
  > {
  thumbnail: string;
}

export interface GetRegionProductAPIDto {
  data: IProductItem[];
}
