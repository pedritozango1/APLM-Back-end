import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  
  @ApiProperty({
    description: 'Nome de usuário do login',
    example: 'pedro.almeida',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  @IsString()
  password: string;
}
