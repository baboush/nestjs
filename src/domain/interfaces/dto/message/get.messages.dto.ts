import { Content, Email, Name } from '@domain/schemas';

export interface GetMessageDto {
  id: number;
  name: Name;
  email: Email;
  content: Content;
  createAt: Date;
}
