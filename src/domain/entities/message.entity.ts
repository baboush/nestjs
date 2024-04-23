import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsDate, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number', uniqueItems: true })
  id: number;

  @Column()
  @Length(4, 25)
  @ApiProperty({ type: 'string', minLength: 4, maxLength: 25 })
  name: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;

  @Column()
  @IsNotEmpty()
  @Length(10, 400)
  @ApiProperty({ type: 'string', maxLength: 400, minLength: 10 })
  content: string;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty({ type: Date })
  createAt: Date;
}
