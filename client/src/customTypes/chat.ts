import { IUser } from './user';

export interface IMessage {
  content: string;
  senderId: number;
  id: number;
  createdAt: Date;
}

export interface IChatRoomResponse {
  id: number;
  createdAt: Date;
  sellerLastVisit: Date;
  seller: IUser;
  buyer: IUser;
  messages: IMessage[];
  buyerLastVisit: Date;
  leavedUserId: number;
  productId: number;
}

export interface IChatRoom {
  id: number;
  createdAt: Date;
  sellerLastVisit: Date;
  peer: IUser;
  messages: IMessage[];
  buyerLastVisit: Date;
  leavedUserId: number;
  productId: number;
}

export enum ChatEvent {
  LEAVE = 'leave',
  ENTER = 'enter',
  CONNECT = 'connect',
  RECIEVE_MESSAGE = 'receive',
  SEND_MESSAGE = 'send',
}

export interface EnterDto {
  chatRoomId: number;
}

export interface EnterChatRoomDto {
  userId: number;
  chatRoomId: number;
}

export interface SendChatDto {
  senderId: number;
  chatRoomId: number;
  content: string;
}
