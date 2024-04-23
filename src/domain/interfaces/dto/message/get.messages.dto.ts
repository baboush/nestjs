import { Content, Email, Name } from '@domain/schemas';

export interface GetMessageDto {
  name: Name;
  email: Email;
  content: Content;
}
