import { Content, Email, Name } from '@domain/schemas';

export interface CreateMessageDto {
  name: Name;
  email: Email;
  content: Content;
}
