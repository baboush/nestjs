import { Message } from '@domain/entities';
import { MessageServiceImplement } from '@infrastructure/services';
import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class DeleteMessageUseCaseImplement {
  constructor(private readonly messageService: MessageServiceImplement) {}

  @ApiOperation({ summary: 'Delete Message By Id' })
  @ApiResponse({ status: 204, description: 'Delete Message Success' })
  async execute(id: number): Promise<Message> {
    return await this.messageService.remove(id);
  }
}
