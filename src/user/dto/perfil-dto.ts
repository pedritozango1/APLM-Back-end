import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePerfilDto {
  @ApiProperty({
    description: 'Nome da chave do perfil (ex: clube, cidade, idade)',
    example: 'clube',
  })
  @IsString()
  chave: string;

  @ApiProperty({
    description: 'Valor associado à chave (ex: Real Madrid, Luanda)',
    example: 'Real Madrid',
  })
  @IsString()
  valor: string;
}
