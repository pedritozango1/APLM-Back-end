import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePerfilDto {
  @ApiPropertyOptional({
    description: 'Valor do perfil (opcional para atualização)',
    example: 'Administrador',
  })
  valor?: string;

  @ApiPropertyOptional({
    description: 'Chave do perfil (opcional para atualização)',
    example: 'ROLE_ADMIN',
  })
  chave?: string;
}
