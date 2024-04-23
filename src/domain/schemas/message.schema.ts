import { z } from 'zod';

export const MessageSchema = z.object({
  name: z.string().min(4).max(25),
  email: z.string().email(),
  content: z.string().min(10).max(400),
});

const NameSchema = z.string().min(4).max(25);

const EmailSchema = z.string().email();

const ContentSchema = z.string().min(10).max(400);

export const MessageSchemaDto = z.object({
  name: NameSchema,
  email: EmailSchema,
  content: ContentSchema,
});

export type Name = z.infer<typeof NameSchema>;
export type Email = z.infer<typeof EmailSchema>;
export type Content = z.infer<typeof ContentSchema>;
export type Message = z.infer<typeof MessageSchema>;
