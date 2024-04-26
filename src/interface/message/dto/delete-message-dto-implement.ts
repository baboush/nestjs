import { RemoveMessageDto } from '@domain/interfaces/dto';
import { Content, Email, Name } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class DeleteMessageDtoImplement implements RemoveMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  @ApiProperty({ type: 'string', minLength: 4, maxLength: 25 })
  readonly name: Name;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  readonly email: Email;

  @IsNotEmpty()
  @IsString()
  @Length(10, 400)
  @ApiProperty({ type: 'string', minLength: 10, maxLength: 400 })
  readonly content: Content;

  @IsString()
  @IsDate()
  @ApiProperty({ type: 'data' })
  readonly createAt: Date;
}
