import { Message } from '@domain/entities';
import { CreateMessageDto, GetMessageDto } from '../dto';

export interface MessageService {
  create(data: CreateMessageDto): Promise<Message>;
  findAll(): string;
  findOne(id: number): Promise<GetMessageDto>;
  remove(id: number): void;
}
