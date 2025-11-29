import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChaveService } from '../service/chave.service';
import { CreateChaveDto } from '../dto/create-chavedto';

@ApiTags('Chaves Públicas')
@Controller('chaves')
export class ChaveController {
  constructor(private readonly chaveService: ChaveService) {}

  // Criar nova chave
  @Post()
  @ApiOperation({ summary: 'Criar uma nova chave pública' })
  @ApiResponse({ status: 201, description: 'Chave criada com sucesso' })
  @ApiResponse({ status: 409, description: 'Chave já existe na lista pública' })
  async create(@Body() data: CreateChaveDto) {
    return this.chaveService.create(data);
  }

  // Buscar todas
  @Get()
  @ApiOperation({ summary: 'Listar todas as chaves públicas' })
  @ApiResponse({ status: 200 })
  async getAll() {
    return this.chaveService.getAll();
  }

  // Buscar uma por ID
  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma chave pública pelo ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Chave não encontrada' })
  async getById(@Param('id') id: string) {
    return this.chaveService.getById(id);
  }

  // Atualizar chave
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma chave pública pelo ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Chave não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<CreateChaveDto>,
  ) {
    return this.chaveService.update(id, data);
  }
}
