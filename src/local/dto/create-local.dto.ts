import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class CreateLocalDto {
  @ApiProperty({ example: 'Campus ISPTEC' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'GPS', enum: ['GPS', 'WIFI'] })
  @IsString()
  @IsIn(['GPS', 'WIFI'])
  tipo: string;
}
