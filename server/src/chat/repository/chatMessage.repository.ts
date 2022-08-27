import { CreateChatMessageDto } from './../dto/CreateChatMessageDto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ChatMessage } from '../entities/chatMessage.entity';

@Injectable()
export class ChatMessageRepository {
  private repository: Repository<ChatMessage>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(ChatMessage);
  }

  public async createMessage(createMessageDto: CreateChatMessageDto) {
    return this.repository.save(createMessageDto);
  }
}
