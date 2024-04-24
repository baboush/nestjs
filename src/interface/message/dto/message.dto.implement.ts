import { GetMessageDto } from '@domain/interfaces/dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Content, Email, Name } from '@domain/schemas';

export class GetMessageDtoImplement implements GetMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  @ApiProperty({ type: 'string', minLength: 4, maxLength: 25 })
  name: Name = '';

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string', format: 'email' })
  email: Email = '';

  @IsNotEmpty()
  @IsString()
  @Length(10, 400)
  @ApiProperty({ type: 'string', minLength: 10, maxLength: 400 })
  content: Content = '';

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ type: Date })
  createAt: Date;
}
