import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { UserService } from '../service/user-service';
import { RegisterDto } from '../dto/registar-dto';
import { User } from '../schema/user-schema';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' }) 
  @ApiBody({ type: RegisterDto, description: 'Dados para registar um novo utilizador' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso', type: User })
  @ApiResponse({ status: 409, description: 'Nome de utilizador já existe' })
  async create(@Body() dto: RegisterDto): Promise<User> {
    return this.userService.create(dto.username, dto.password);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Buscar um usuário pelo nome de utilizador' })
  @ApiParam({ name: 'username', example: 'pedro.almeida', description: 'Nome de utilizador para pesquisa' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findByUsername(@Param('username') username: string): Promise<User | null> {
    return this.userService.findByUsername(username);
  }
  @Get("")
  @ApiOperation({summary:"Listar todos os uses"})
  @ApiResponse({ status: 200, description: 'Lista de usuários'})
  async findAll(){
    return this.userService.findAll();
  }
} 
