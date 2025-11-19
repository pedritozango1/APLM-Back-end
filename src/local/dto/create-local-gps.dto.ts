import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreateLocalDto } from './create-local.dto';

export class CreateLocalGpsDto extends CreateLocalDto {
  @ApiProperty({ example: -8.9112 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 13.2345 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  raio: number;
}
