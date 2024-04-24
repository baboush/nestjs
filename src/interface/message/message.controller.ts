import { Message } from '@domain/entities';
import {
  CreateMessageUsecaseImplement,
  GetMessageUsecaseImplement,
} from '@infrastructure/use-cases';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetMessageDto } from '@domain/interfaces/dto';
import { MessageSchemaDto } from '@domain/schemas/message.schema';
import { CreateMessageDtoImplement, GetMessageDtoImplement } from './dto';

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
  @ApiBadRequestResponse({ description: 'La requete est incorrecte' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne au serveur' })
  async create(
    @Body() dataMessage: CreateMessageDtoImplement,
  ): Promise<Message> {
    const createdMessage: CreateMessageDtoImplement = { ...dataMessage };

    if (!MessageSchemaDto.parse(createdMessage)) {
      throw new BadRequestException(
        'Erreur les donnee ne sont pas correctement parse',
      );
    }

    return await this.createMessageUsecase.execute(createdMessage);
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
  @ApiBadRequestResponse({ description: 'La requete est incorrecte' })
  @ApiNotFoundResponse({
    description: 'La requete a echoue a trouver le message',
  })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne au serveur' })
  async findOne(@Param('id') id: number): Promise<GetMessageDto> {
    let dataMessage: GetMessageDto = new GetMessageDtoImplement();
    const result = await this.getMessageUsecase.execute(id);

    if (!result) {
      throw new NotFoundException(
        `Error le message n'existe pas dans la base de donnee`,
      );
    }
    if (!MessageSchemaDto.parse(result)) {
      throw new BadRequestException(
        `Le resultat attendu ne correspond pas au schema`,
      );
    }
    dataMessage = { ...result };
    return dataMessage;
  }

  @Delete(':id')
  remove() {}
}
