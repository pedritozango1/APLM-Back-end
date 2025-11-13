import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'pedro.almeida',
    description: 'Nome de utilizador único para o registo',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'senha1234',
    description: 'Senha do utilizador (mínimo de 4 caracteres)',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  password: string;
}
