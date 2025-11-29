import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

import { UserService } from '../service/user-service';
import { RegisterDto } from '../dto/registar-dto';
import { User } from '../schema/user-schema';
import { CreatePerfilDto } from '../dto/perfil-dto';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

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
  @ApiOperation({ summary: "Listar todos os uses" })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  async findAll() {
    return this.userService.findAll();
  }
  @Post(':id/perfil')
  @ApiOperation({ summary: 'Adicionar um perfil ao usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: CreatePerfilDto })
  @ApiResponse({ status: 200, description: 'Perfil adicionado com sucesso' })
  async addPerfil(
    @Param('id') idUsuario: string,
    @Body() perfilDto: CreatePerfilDto,
  ) {
    return this.userService.addPerfil(idUsuario, perfilDto);
  }
  @Delete(':id/perfil/:idPerfil')
  @ApiOperation({ summary: 'Remover um perfil do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiParam({ name: 'idPerfil', description: 'ID do perfil dentro do array' })
  @ApiResponse({ status: 200, description: 'Perfil removido com sucesso' })
  async removerPerfil(
    @Param('id') idUsuario: string,
    @Param('idPerfil') idPerfil: string,
  ) {
    return this.userService.removerPerfil(idUsuario, idPerfil);
  }

  @Put(':id/perfil')
  @ApiOperation({ summary: 'Editar um perfil já existente do usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: CreatePerfilDto })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso' })
  async editarPerfil(
    @Param('id') idUsuario: string,
    @Body() perfilDto: CreatePerfilDto,
  ) {
    return this.userService.editarPerfil(idUsuario, perfilDto);
  }

  @Get('perfil-all/:id')
  @ApiOperation({ summary: 'Lista Perfil do Usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil retornado com sucesso' })
  async listarPerfil(
    @Param('id') idUsuario: string,
  ) {
    return this.userService.findByPerfil(idUsuario);
  }
} 
