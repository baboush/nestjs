import { Message } from '@domain/entities';
import { CreateMessageDto } from '@domain/interfaces/dto';
import { MessageRepository } from '@domain/interfaces/repositories';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDtoImplement } from '@interface/message/dto';
import { MessageSchema } from '@domain/schemas/message.schema';

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

  async findAllMessagesOrderByDate(): Promise<Message[]> {
    const result = await this.messageRepository.find({
      order: { createAt: 'DESC' },
    });

    if (!result) {
      throw new NotFoundException(`La liste de messages n'a pas etait trouver`);
    }
    return result;
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

  async deleteMessage(id: number): Promise<Message> {
    const result = await this.findMessageById(id);

    if (!result) {
      throw new NotFoundException(
        `Le message a suprime n'existe pas dans la base de donnee`,
      );
    }
    const deleteMessage = await this.messageRepository.delete(id);
    if (deleteMessage.affected === 0) {
      throw new NotFoundException(
        `Le message avec l' ${id} n'a pas etait trouver`,
      );
    }
    return result;
  }

  async createMessage(messageData: CreateMessageDto): Promise<Message> {
    const createdMessage: CreateMessageDtoImplement = { ...messageData };

    const result = this.messageRepository.create(createdMessage);
    return await this.messageRepository.save(result);
  }
}
