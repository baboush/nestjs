import { Message } from '@domain/entities';
import {
  CreateMessageUsecaseImplement,
  DeleteMessageUseCaseImplement,
  FindAllMessagesByDateUseCaseImplement,
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
import { GetMessageDto } from '@domain/interfaces/dto';
import { MessageSchemaDto } from '@domain/schemas/message.schema';
import { CreateMessageDtoImplement, GetMessageDtoImplement } from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('message')
@ApiTags('message')
export class MessageController {
  constructor(
    private readonly createMessageUsecase: CreateMessageUsecaseImplement,
    private readonly getMessageUsecase: GetMessageUsecaseImplement,
    private readonly findMessagesByDateUseCase: FindAllMessagesByDateUseCaseImplement,
    private readonly deleteMessageById: DeleteMessageUseCaseImplement,
  ) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Réponse réussie' })
  @ApiOperation({ summary: 'Description de create' })
  @ApiNotFoundResponse({ description: 'Ressource non trouvée' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  /* @ApiOperation({ summary: 'Create Message' })
  @ApiResponse({ status: 201, description: 'create message', type: [Message] })
  @ApiBadRequestResponse({ description: 'La requete est incorrecte' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne au serveur' })*/
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

  @ApiOperation({ summary: 'Find one messge by id' })
  @ApiResponse({
    status: 200,
    description: 'find one message by id',
    type: [Message],
  })
  @ApiBadRequestResponse({ description: 'La requete est incorrecte' })
  @ApiNotFoundResponse({
    description: 'La requete a echoue a trouver une liste de messages',
  })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne au serveur' })
  @Get()
  @ApiResponse({ status: 200, description: 'Réponse réussie' })
  @ApiOperation({
    summary: 'Description de findAllOrderDateDesc',
  })
  @ApiNotFoundResponse({ description: 'Ressource non trouvée' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
  async findAllOrderDateDesc(): Promise<Message[]> {
    const result = await this.findMessagesByDateUseCase.execute();

    if (!result) {
      throw new NotFoundException(
        `Error le message n'existe pas dans la base de donnee`,
      );
    }
    return result;
  }

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
  @ApiResponse({ status: 200, description: 'Réponse réussie' })
  @ApiOperation({
    summary: 'Description de findOne',
  })
  @ApiNotFoundResponse({ description: 'Ressource non trouvée' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne du serveur' })
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

  @ApiOperation({ summary: 'Delete message by id' })
  @ApiResponse({
    status: 204,
    description: 'Delete message by id',
    type: [Message],
  })
  @ApiBadRequestResponse({ description: 'La requete est incorrecte' })
  @ApiInternalServerErrorResponse({ description: 'Erreur interne au serveur' })
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Réponse réussie' })
  @ApiOperation({
    summary: 'Description de remove',
  })
  @ApiNotFoundResponse({ description: 'Ressource non trouvée' })
  async remove(@Param('id') id: number): Promise<Message> {
    const result = await this.deleteMessageById.execute(id);

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
    return result;
  }
}
