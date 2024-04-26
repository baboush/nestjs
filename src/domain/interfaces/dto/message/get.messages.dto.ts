import { Content, Email, Name } from '@domain/schemas';

export interface GetMessageDto {
  readonly id: number;
  name: Name;
  email: Email;
  content: Content;
  readonly createAt: Date;
}
