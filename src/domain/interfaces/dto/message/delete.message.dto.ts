import { Content, Email, Name } from '@domain/schemas';

export interface RemoveMessageDto {
  readonly id: number;
  readonly name: Name;
  readonly email: Email;
  readonly content: Content;
  readonly createAt: Date;
}
