import { CreatChatRoomRequestDto } from './dto/CreateChatRoomRequest.dto';
import { ProductRepository } from './../product/repository/product.repository';
import { CreateChatMessageDto } from './dto/CreateChatMessage.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ChatMessageRepository } from './repository/chatMessage.repository';
import { ChatRoomRepository } from './repository/chatRoom.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  createChatMessage(createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessageRepository.create(createChatMessageDto);
  }

  async createChatRoom(creatChatRoomRequestDto: CreatChatRoomRequestDto) {
    const { productId } = creatChatRoomRequestDto;
    const { sellerId } = await this.productRepository.findOneByProductId(
      productId,
    );
    const createChatRoomDto = { sellerId, ...creatChatRoomRequestDto };
    return this.chatRoomRepository.create(createChatRoomDto);
  }

  getChatRoom(chatRoomId: number) {
    return this.chatRoomRepository.findByChatRoomId(chatRoomId);
  }

  getAllChatRoom(userId: number) {
    return this.userRepository.findAllChatRoomByUserId(userId);
  }

  getAllSellingProductChatRoom(userId: number, productId: number) {
    return this.chatRoomRepository.findSellingProductChatRooms(
      userId,
      productId,
    );
  }

  async leaveChatRoom(userId: number, chatRoomId: number) {
    const leavedUserId = await this.chatRoomRepository.getLeavedUserId(
      chatRoomId,
    );
    if (!leavedUserId) {
      return this.chatRoomRepository.updateLeavedUserId(chatRoomId, userId);
    }
    if (leavedUserId === userId) {
      throw new HttpException(
        '이미 방을 나간 유저입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.chatRoomRepository.delete(chatRoomId);
  }
}
