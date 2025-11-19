import { ApiProperty } from '@nestjs/swagger';

export class CreatePerfilDto {
  @ApiProperty({
    description: 'Valor do perfil',
    example: 'Administrador',
  })
  valor: string;

  @ApiProperty({
    description: 'Chave do perfil',
    example: 'ROLE_ADMIN',
  })
  chave: string;
}
