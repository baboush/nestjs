import { Message } from '@domain/entities';
import { MessageService } from '@domain/interfaces';
import { CreateMessageDto, GetMessageDto } from '@domain/interfaces/dto';
import { MessageSchema } from '@domain/schemas';
import { MessageSchemaDto } from '@domain/schemas/message.schema';
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

    /*if (!MessageSchemaDto.parse(createdMessage)) {
      throw new Error("Le messages n'est pas du type attendu");
    }*/

    const message = new Message();
    message.name = createdMessage.name.value;
    message.email = createdMessage.email.value;
    message.content = createdMessage.content.value;
    return message;
  }

  findAll(): string {
    return `This action returns all message`;
  }

  async findOne(id: number): Promise<GetMessageDto> {
    const result = await this.messageRepository.findMessageById(id);
    const createdMessage: GetMessageDto = new GetMessageDtoImplement();

    if (!result) {
      throw new NotFoundException(
        `Le message n'existe pas dans la base de donnee`,
      );
    }
    if (!MessageSchema.parse(result)) {
      throw new Error(
        `Les donnee sortante ne corresponde pas au schema attendu`,
      );
    }
    createdMessage.name.value = result.name;
    createdMessage.email.value = result.email;
    createdMessage.content.value = result.content;
    return createdMessage;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
