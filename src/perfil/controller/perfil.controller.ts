import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PerfilService } from '../service/perfil.service';
import { Perfil } from '../schema/perfil.schema';
import { CreatePerfilDto } from '../dto/create-perfil.dto';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';

@ApiTags('Perfis')
@Controller('perfis')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo perfil',
    description: 'Cria um perfil com os campos valor e chave.',
  })
  @ApiBody({ type: Perfil })
  @ApiResponse({ status: 201, description: 'Perfil criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() data: CreatePerfilDto) {
    return this.perfilService.createPerfil(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis',
    description: 'Retorna todos os perfis cadastrados.',
  })
  @ApiResponse({ status: 200, description: 'Lista de perfis retornada.' })
  findAll() {
    return this.perfilService.getAllPerfis();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar perfil por ID',
    description: 'Retorna os detalhes de um perfil específico pelo ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do perfil a ser buscado' })
  @ApiResponse({ status: 200, description: 'Perfil encontrado.' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado.' })
  findById(@Param('id') id: string) {
    return this.perfilService.getPerfilById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar um perfil existente',
    description: 'Atualiza os dados de um perfil existente pelo ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do perfil a ser atualizado' })
  @ApiBody({ type: Perfil })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado.' })
  update(@Param('id') id: string, @Body() data: UpdatePerfilDto) {
    return this.perfilService.updatePerfil(id, data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover um perfil',
    description: 'Remove permanentemente um perfil com base no seu ID.',
  })
  @ApiParam({ name: 'id', description: 'ID do perfil a ser removido' })
  @ApiResponse({ status: 200, description: 'Perfil removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado.' })
  delete(@Param('id') id: string) {
    return this.perfilService.deletePerfil(id);
  }

  @Get('/search/by-valor')
  @ApiOperation({
    summary: 'Pesquisar perfis por valor',
    description: 'Permite buscar perfis que contenham parte do valor informado.',
  })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Texto ou parte do valor para pesquisa',
    example: 'Administrador',
  })
  @ApiResponse({ status: 200, description: 'Resultados da pesquisa retornados.' })
  search(@Query('q') query: string) {
    // Aqui chamaria um método de service que faz a busca por valor
    return this.perfilService.getAllPerfis(); // provisório, ajustar depois
  }
}
