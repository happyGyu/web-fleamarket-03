import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateChatRoomDto } from '../dto/CreateChatRoomDto';
import { ChatRoom } from '../entities/chatRoom.entity';

@Injectable()
export class ChatRoomRepository {
  private repository: Repository<ChatRoom>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(ChatRoom);
  }

  async create(createChatRoomDto: CreateChatRoomDto) {
    try {
      return await this.repository.save(createChatRoomDto);
    } catch (error) {
      throw new HttpException(
        '채팅방 생성에 실패했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByChatRoomId(chatRoomId: number) {
    return await this.repository.findOne({
      where: { id: chatRoomId },
      relations: { messages: true },
    });
  }

  async findAllSellingProductChatRoom(sellerId: number) {
    return await this.repository.find({
      where: { sellerId },
      relations: { messages: true },
    });
  }

  async getLeavedUserId(chatRoomId: number) {
    return await this.repository.findOne({
      where: { id: chatRoomId },
      select: { leavedUserId: true },
    });
  }

  async updateLeavedUserId(chatRoomId: number, leavingUserId: number) {
    return await this.repository.update(
      { id: chatRoomId },
      { leavedUserId: leavingUserId },
    );
  }

  async delete(chatRoomId: number) {
    return await this.repository.delete({ id: chatRoomId });
  }
}
