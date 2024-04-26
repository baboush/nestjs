import { Message } from '@domain/entities';
import { CreateMessageDto } from '../dto';

export interface MessageRepository {
  findAllMessagesOrderByDate(): Promise<Message[]>;
  findMessageById(id: number): Promise<Message | null>;
  deleteMessage(id: number): Promise<Message>;
  createMessage(messageData: CreateMessageDto): Promise<Message>;
}
