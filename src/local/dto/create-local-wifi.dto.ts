import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateLocalDto } from './create-local.dto';

export class CreateLocalWifiDto extends CreateLocalDto {
  @ApiProperty({
    example: ['ISPTEC_WIFI_1', 'ISPTEC_WIFI_2'],
    description: 'Lista de IDs de redes WiFi detectadas',
  })
  @IsArray()
  @IsString({ each: true })
  sinal: string[];
}
