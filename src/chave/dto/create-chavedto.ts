import { ApiProperty } from '@nestjs/swagger';

export class CreateChaveDto {
  @ApiProperty({
    description: 'chave do perfil',
    example: 'club',
  })
  nome: string;
}
