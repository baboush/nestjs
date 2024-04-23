import { Message } from '@domain/entities';
import { CreateMessageDto } from '@domain/interfaces/dto';

export interface CreateMessageUsecase {
  execute(data: CreateMessageDto): Promise<Message>;
}
