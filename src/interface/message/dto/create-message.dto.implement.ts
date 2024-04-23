import { CreateMessageDto } from '@domain/interfaces';
import { Content, Email, Name } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMessageDtoImplement implements CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  @ApiProperty({ type: 'Name', minLength: 4, maxLength: 25 })
  readonly name: Name = { value: '' };

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'Email', format: 'email' })
  readonly email: Email = { value: '' };

  @IsNotEmpty()
  @IsString()
  @Length(10, 400)
  @ApiProperty({ type: 'Content', minLength: 10, maxLength: 400 })
  readonly content: Content = { value: '' };
}
