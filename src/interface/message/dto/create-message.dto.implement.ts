import { CreateMessageDto } from '@domain/interfaces';
import { Content, Email, Name } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMessageDtoImplement implements CreateMessageDto {
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
}
