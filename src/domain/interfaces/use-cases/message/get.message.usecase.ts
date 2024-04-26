import { Message } from '@domain/entities';

export interface GetMessageUsecase {
  execute(id: number): Promise<Message>;
}
