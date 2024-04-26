import { Message } from '@domain/entities';
import { MessageService } from '@domain/interfaces/services';
import { CreateMessageDto } from '@domain/interfaces/dto';
import { MessageRepositoryImplement } from '@infrastructure/repositories';
import {
  CreateMessageDtoImplement,
  GetMessageDtoImplement,
} from '@interface/message/dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class MessageServiceImplement implements MessageService {
  constructor(
    @InjectRepository(MessageRepositoryImplement)
    private readonly messageRepository: MessageRepositoryImplement,
  ) {}

  async create(messageData: CreateMessageDto): Promise<Message> {
    let createdMessage: CreateMessageDtoImplement =
      new CreateMessageDtoImplement();
    createdMessage = { ...messageData };

    return await this.messageRepository.createMessage(createdMessage);
  }

  async findAllOrderByDate(): Promise<Message[]> {
    const result = await this.messageRepository.findAllMessagesOrderByDate();

    if (!result) {
      throw new NotFoundException(
        `Le message n'existe pas dans la base de donnee`,
      );
    }

    const messagesData: GetMessageDtoImplement[] = result.map((message) => ({
      id: message.id,
      name: message.name,
      email: message.email,
      content: message.content,
      createAt: message.createAt,
    }));
    return messagesData;
  }

  async findOne(id: number): Promise<Message> {
    let message: GetMessageDtoImplement = new GetMessageDtoImplement();
    const result = await this.messageRepository.findMessageById(id);

    if (!result) {
      throw new NotFoundException(
        `Le message n'existe pas dans la base de donnee`,
      );
    }
    message = { ...result };
    return message;
  }

  async remove(id: number): Promise<Message> {
    const result = await this.messageRepository.deleteMessage(id);

    if (!result) {
      throw new NotFoundException(
        `Le message n'existe pas dans la base de donnee`,
      );
    }
    const messagesData: GetMessageDtoImplement = {
      id: result.id,
      name: result.name,
      email: result.email,
      content: result.content,
      createAt: result.createAt,
    };

    return messagesData;
  }
}
