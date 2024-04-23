import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '@domain/entities';
import { MessageServiceImplement } from '@infrastructure/services';
import { MessageRepositoryImplement } from '@infrastructure/repositories';
import {
  CreateMessageUsecaseImplement,
  GetMessageUsecaseImplement,
} from '@infrastructure/use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [
    MessageServiceImplement,
    MessageRepositoryImplement,
    CreateMessageUsecaseImplement,
    GetMessageUsecaseImplement,
  ],
})
export class MessageModule {}
