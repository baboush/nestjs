import { Message } from '@domain/entities';
import { CreateMessageDto } from '../dto';

export interface MessageService {
  create(data: CreateMessageDto): Promise<Message>;
  findAllOrderByDate(): Promise<Message[]>;
  findOne(id: number): Promise<Message>;
  remove(id: number): Promise<Message>;
}
