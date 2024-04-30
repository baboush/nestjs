import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class testDto {
  @IsNotEmpty()
  @IsString()
    @ApiProperty({ description: "name", type: "string" })
  name: string;
}
