import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { number, string } from 'zod';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: number, uniqueItems: true })
  id: number;

  @Column('varchar', { length: 25 })
  @Length(4, 25)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: string, uniqueItems: true })
  title: string;

  @Column()
  @Length(10, 50)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: string, format: 'content' })
  content: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({
    type: string,
  })
  images: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: string })
  technologie: string;

  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  createAt: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty({ type: Date })
  updateAt: Date;

  @DeleteDateColumn()
  @IsDate()
  @ApiProperty({ type: Date })
  deleteAt: Date;
}
