import { Message } from '@domain/entities';

export interface FindAllMessagesOrderByDate {
  execute(): Promise<Message[]>;
}
