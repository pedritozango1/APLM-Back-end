import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class PerfilDto {
    @ApiProperty({ example: 'curso' })
    @IsString()
    @IsNotEmpty()
    chave: string;

    @ApiProperty({ example: 'Engenharia de Software' })
    @IsString()
    @IsNotEmpty()
    valor: string;
}

export class AnunciosProximosDto {
    @ApiProperty({
        description: 'Latitude GPS do usuário',
        example: -8.8383,
    })
    @IsNumber()
    latitude: number;

    @ApiProperty({
        description: 'Longitude GPS do usuário',
        example: 13.2344,
    })
    @IsNumber()
    longitude: number;
     @ApiProperty({ description: 'Lista de SSIDs WiFi visíveis', required: false })
      @IsOptional()
      @IsArray()
      ssids?: string[];
}