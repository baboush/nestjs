import { Message } from '@domain/entities';
import { CreateMessageDto } from '../dto';

export interface MessageRepository {
  findAllMessage(): Promise<Message[]>;
  findMessageById(id: number): Promise<Message | null>;
  deleteMessage(id: number): Promise<boolean>;
  createMessage(messageData: CreateMessageDto): Promise<Message>;
}
