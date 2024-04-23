import { Message } from '@domain/entities';
import { CreateMessageDto } from '@domain/interfaces';
import {
  CreateMessageUsecaseImplement,
  GetMessageUsecaseImplement,
} from '@infrastructure/use-cases';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDtoImplement, GetMessageDtoImplement } from './dto';
import { GetMessageDto } from '@domain/interfaces/dto';
import { MessageSchemaDto } from '@domain/schemas/message.schema';

@Controller('message')
@ApiTags('message')
export class MessageController {
  constructor(
    private readonly createMessageUsecase: CreateMessageUsecaseImplement,
    private readonly getMessageUsecase: GetMessageUsecaseImplement,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create Message' })
  @ApiResponse({ status: 201, description: 'create message', type: [Message] })
  async create(@Body() dataMessage: CreateMessageDto): Promise<Message> {
    let createdMessage: CreateMessageDto = new CreateMessageDtoImplement();
    createdMessage = { ...dataMessage };

    /*if (!MessageSchemaDto.parse(createdMessage)) {
      throw new Error('Erreur les donnee ne sont pas correctement parse');
    }*/

    const message = new Message();
    message.name = createdMessage.name.value;
    message.email = createdMessage.email.value;
    message.content = createdMessage.content.value;
    await this.createMessageUsecase.execute(createdMessage);
    return message;
  }

  @Get()
  findAll() {}

  @Get(':id')
  @ApiOperation({ summary: 'Find one messge by id' })
  @ApiResponse({
    status: 200,
    description: 'find one message by id',
    type: [Message],
  })
  async findOne(@Param('id') id: number): Promise<GetMessageDto> {
    let dataMessage: GetMessageDto = new GetMessageDtoImplement();
    const result = await this.getMessageUsecase.execute(id);

    if (!result) {
      throw new NotFoundException(
        `Error le message n'existe pas dans la base de donnee`,
      );
    }
    if (!MessageSchemaDto.parse(result)) {
      throw new Error(`Le resultat attendu ne correspond pas au schema`);
    }
    dataMessage = { ...result };
    return dataMessage;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
