import { Message } from '@domain/entities';
import { GetMessageUsecase } from '@domain/interfaces/use-cases';
import { MessageServiceImplement } from '@infrastructure/services';
import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class GetMessageUsecaseImplement implements GetMessageUsecase {
  constructor(private readonly messageService: MessageServiceImplement) {}

  @ApiOperation({ summary: 'Get message' })
  @ApiResponse({ status: 201, description: 'Get Message Success' })
  async execute(id: number): Promise<Message> {
    return await this.messageService.findOne(id);
  }
}
