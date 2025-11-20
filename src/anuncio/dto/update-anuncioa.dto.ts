import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, MaxLength, IsDateString } from 'class-validator';

export class UpdateAnuncioDto {
  @ApiPropertyOptional({
    description: 'Título do anúncio',
    maxLength: 200,
    example: 'Manutenção Programada do Sistema - Atualizado'
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  titulo?: string;

  @ApiPropertyOptional({
    description: 'Mensagem do anúncio',
    maxLength: 1000,
    example: 'O sistema ficará indisponível no próximo sábado para manutenção. Horário atualizado.'
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  mensagem?: string;

  @ApiPropertyOptional({
    description: 'Local do anúncio',
    example: 'Sistema Principal - Área Administrativa'
  })
  @IsString()
  @IsOptional()
  local?: string;

  @ApiPropertyOptional({
    description: 'Modo de entrega do anúncio',
    enum: ['centralizado', 'descentralizado'],
    example: 'descentralizado'
  })
  @IsEnum(['centralizado', 'descentralizado'])
  @IsOptional()
  modoEntrega?: string;

  @ApiPropertyOptional({
    description: 'Política de distribuição',
    enum: ['whitelist', 'blacklist'],
    example: 'whitelist'
  })
  @IsEnum(['whitelist', 'blacklist'])
  @IsOptional()
  politica?: string;

  @ApiPropertyOptional({
    description: 'Data e hora de início do anúncio',
    type: String,
    format: 'date-time',
    example: '2024-01-16T10:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  inicio?: Date;

  @ApiPropertyOptional({
    description: 'Data e hora de fim do anúncio',
    type: String,
    format: 'date-time',
    example: '2024-01-21T18:00:00.000Z'
  })
  @IsDateString()
  @IsOptional()
  fim?: Date;
}