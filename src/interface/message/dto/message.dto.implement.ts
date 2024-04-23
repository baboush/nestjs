import { GetMessageDto } from '@domain/interfaces/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Content, Email, Name } from '@domain/schemas';

export class GetMessageDtoImplement implements GetMessageDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 25)
  @ApiProperty({ type: 'Name', minLength: 4, maxLength: 25 })
  name: Name = { value: '' };

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'Email', format: 'email' })
  email: Email = { value: '' };

  @IsNotEmpty()
  @IsString()
  @Length(10, 400)
  @ApiProperty({ type: 'Content', minLength: 10, maxLength: 400 })
  content: Content = { value: '' };
}
