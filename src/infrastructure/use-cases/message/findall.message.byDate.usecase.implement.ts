import { Message } from '@domain/entities';
import { FindAllMessagesOrderByDate } from '@domain/interfaces/use-cases';
import { MessageServiceImplement } from '@infrastructure/services';
import { Injectable } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class FindAllMessagesByDateUseCaseImplement
  implements FindAllMessagesOrderByDate
{
  constructor(private readonly messageService: MessageServiceImplement) {}

  @ApiOperation({ summary: 'Find All Message Order By Date DESC' })
  @ApiResponse({
    status: 200,
    description: 'Find All Message Order By DESC Success',
  })
  async execute(): Promise<Message[]> {
    return await this.messageService.findAllOrderByDate();
  }
}
