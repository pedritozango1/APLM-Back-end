import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEnum,
    IsNotEmpty,
    MaxLength,
    IsDateString,
    IsMongoId,
} from 'class-validator';

export class CreateAnuncioDto {
    @ApiProperty({ description: 'Título do anúncio', maxLength: 200 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    titulo: string;

    @ApiProperty({ description: 'Mensagem completa do anúncio', maxLength: 1000 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    mensagem: string;

    @ApiProperty({
        description: 'ID do Local onde o anúncio será exibido',
        example: '507f1f77bcf86cd799439011',
    })
    @IsMongoId({ message: 'ID do local inválido' })
    @IsNotEmpty()
    local: string;

    @ApiProperty({
        description: 'ID do Chave onde o anúncio será exibido',
        example: '507f1f77bcf86cd799439011',
    })
    @IsMongoId({ message: 'ID do chave inválido' })
    @IsNotEmpty()
    chave: string[];

    @ApiProperty({
        description: 'ID do Local onde o anúncio será exibido',
        example: '507f1f77bcf86cd799439011',
    })
    @IsMongoId({ message: 'ID do local inválido' })
    @IsNotEmpty()
    user: string;

    @ApiProperty({
        description: 'Modo de entrega',
        enum: ['centralizado', 'descentralizado'],
        default: 'centralizado',
    })
    @IsEnum(['centralizado', 'descentralizado'])
    modoEntrega: 'centralizado' | 'descentralizado';

    @ApiProperty({
        description: 'Política de visibilidade',
        enum: ['whitelist', 'blacklist'],
        default: 'blacklist',
    })
    @IsEnum(['whitelist', 'blacklist'])
    politica: 'whitelist' | 'blacklist';

    @ApiProperty({
        description: 'Data e hora de início do anúncio',
        type: String,
        format: 'date-time',
        example: '2025-01-10T08:00:00.000Z',
    })
    @IsDateString()
    @IsNotEmpty()
    inicio: string;

    @ApiProperty({
        description: 'Data e hora de término do anúncio',
        type: String,
        format: 'date-time',
        example: '2025-01-15T18:00:00.000Z',
    })
    @IsDateString()
    @IsNotEmpty()
    fim: string;
}