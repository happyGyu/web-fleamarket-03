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

export interface EnterChatRoomProps {
  userId: number;
  chatRoomId: number;
}

export interface SendChat {
  senderId: number;
  chatRoomId: number;
  content: string;
}
