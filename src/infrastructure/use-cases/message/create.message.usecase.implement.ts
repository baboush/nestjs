import { Message } from '@domain/entities';
import { CreateMessageDto } from '@domain/interfaces';
import { CreateMessageUsecase } from '@domain/interfaces/use-cases';
import { MessageServiceImplement } from '@infrastructure/services';
import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class CreateMessageUsecaseImplement implements CreateMessageUsecase {
  constructor(private readonly messageService: MessageServiceImplement) {}

  @ApiOperation({ summary: 'Create New Message' })
  @ApiResponse({ status: 201, description: 'Create New Message Success' })
  async execute(messageData: CreateMessageDto): Promise<Message> {
    return await this.messageService.create(messageData);
  }
}
