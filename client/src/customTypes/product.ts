import { IRegion } from './region';
import { IUser } from './user';

export type SalesStatusType = keyof typeof SalesStatusEnum;

export enum SalesStatusEnum {
  sale = '판매중',
  reserved = '예약중',
  sold = '판매완료',
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  region: IRegion;
  salesStatus: SalesStatusType;
  createdAt: string;
  updatedAt: string;
  thumbnails: string[];
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

export interface CreateProductAPIDto {
  name: string;
  price: number;
  regionId: IRegion['id'];
  thumbnails: JSON;
  description: string;
  categoryId: number;
}

export type PatchProductDto = Partial<CreateProductAPIDto>;
