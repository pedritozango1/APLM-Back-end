import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsDate, IsNotEmpty, MaxLength, IsOptional, Validate, IsDateString, IsObject } from 'class-validator';

export class CreateAnuncioDto {
  @ApiProperty({
    description: 'Título do anúncio',
    maxLength: 200,
    example: 'Manutenção Programada do Sistema'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titulo: string;

  @ApiProperty({
    description: 'Mensagem do anúncio',
    maxLength: 1000,
    example: 'O sistema ficará indisponível no próximo sábado para manutenção.'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  mensagem: string;

  @ApiProperty({
    description: 'Local do anúncio',
    example: 'Sistema Principal'
  })
  @IsString()
  @IsNotEmpty()
  local: string;

  @ApiProperty({
    description: 'Modo de entrega do anúncio',
    enum: ['centralizado', 'descentralizado'],
    example: 'centralizado'
  })
  @IsEnum(['centralizado', 'descentralizado'])
  @IsNotEmpty()
  modoEntrega: string;

  @ApiProperty({
    description: 'Política de distribuição',
    enum: ['whitelist', 'blacklist'],
    example: 'blacklist'
  })
  @IsEnum(['whitelist', 'blacklist'])
  @IsNotEmpty()
  politica: string;

  @ApiProperty({
    description: 'Data e hora de início do anúncio',
    type: String,
    format: 'date-time',
    example: '2024-01-15T10:00:00.000Z'
  })
  @IsDateString()
  @IsNotEmpty()
  inicio: Date;

  @ApiProperty({
    description: 'Data e hora de fim do anúncio',
    type: String,
    format: 'date-time',
    example: '2024-01-20T18:00:00.000Z'
  })
  @IsDateString()
  @IsNotEmpty()
  fim: Date;
}

export class AtualizarAnuncioDto {
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

export class AnuncioResponseDto {
  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  _id: string;

  @ApiProperty({ example: 'Manutenção Programada do Sistema' })
  titulo: string;

  @ApiProperty({ example: 'O sistema ficará indisponível no próximo sábado para manutenção.' })
  mensagem: string;

  @ApiProperty({ example: 'Sistema Principal' })
  local: string;

  @ApiProperty({ enum: ['centralizado', 'descentralizado'], example: 'centralizado' })
  modoEntrega: string;

  @ApiProperty({ enum: ['whitelist', 'blacklist'], example: 'blacklist' })
  politica: string;

  @ApiProperty({ type: String, format: 'date-time', example: '2024-01-15T10:00:00.000Z' })
  inicio: Date;

  @ApiProperty({ type: String, format: 'date-time', example: '2024-01-20T18:00:00.000Z' })
  fim: Date;

  @ApiProperty({ type: String, format: 'date-time', example: '2024-01-10T15:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time', example: '2024-01-10T15:30:00.000Z' })
  updatedAt: Date;
}