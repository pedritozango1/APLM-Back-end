import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

// dto/reportar-localizacao.dto.ts
export class ReportarLocalizacaoDto {
  @ApiProperty({ description: 'Latitude do usuário' })
  @IsNumber()
  latitude: number;

  @ApiProperty({ description: 'Longitude do usuário' })
  @IsNumber()
  longitude: number;

  @ApiProperty({ description: 'Lista de SSIDs WiFi visíveis', required: false })
  @IsOptional()
  @IsArray()
  ssids?: string[];

  @ApiProperty({ description: 'Username do usuário' })
  @IsString()
  username: string;
}