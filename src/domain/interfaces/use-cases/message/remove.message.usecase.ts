import { Message } from '@domain/entities';

export interface RemoveMessageUseCase {
  excute(id: number): Promise<Message>;
}
