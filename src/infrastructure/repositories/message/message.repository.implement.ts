import { Message } from '@domain/entities';
import { CreateMessageDto, MessageRepository } from '@domain/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDtoImplement } from '@interface/message/dto';
import {
  MessageSchema,
  MessageSchemaDto,
} from '@domain/schemas/message.schema';

@Injectable()
export class MessageRepositoryImplement
  extends Repository<Message>
  implements MessageRepository
{
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {
    super(
      messageRepository.target,
      messageRepository.manager,
      messageRepository.queryRunner,
    );
  }

  async findAllMessage(): Promise<Message[]> {
    const message: Message[] = [];
    return message;
  }

  async findMessageById(id: number): Promise<Message | null> {
    const result = await this.messageRepository.findOneBy({ id: id });

    if (!result) {
      throw new NotFoundException(
        "Le message n'existe pas dans la base de donnee",
      );
    }
    if (!MessageSchema.parse(result)) {
      throw new Error("Le message n'est pas du type attendu");
    }
    return result;
  }

  async deleteMessage(id: number): Promise<boolean> {
    return true;
  }

  async createMessage(messageData: CreateMessageDto): Promise<Message> {
    let createdMessage: CreateMessageDtoImplement =
      new CreateMessageDtoImplement();
    createdMessage = { ...messageData };
    /*if (!MessageSchemaDto.parse(createdMessage)) {
      throw new Error("Le messages n'est pas du type attendu");
    }*/

    const message = new Message();
    message.name = createdMessage.name.value;
    message.email = createdMessage.email.value;
    message.content = createdMessage.content.value;
    const result = this.messageRepository.create(message);
    return await this.messageRepository.save(result);
  }
}
