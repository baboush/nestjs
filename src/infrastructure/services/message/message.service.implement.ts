import { Message } from '@domain/entities';
import { MessageService } from '@domain/interfaces';
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

  findAll(): string {
    return `This action returns all message`;
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

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
