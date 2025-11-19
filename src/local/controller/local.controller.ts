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
    ApiQuery,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiExtraModels,
    getSchemaPath,
} from '@nestjs/swagger';
import { LocalService } from '../service/local.service';
import { CreateLocalWifiDto } from '../dto/create-local-wifi.dto';
import { CreateLocalGpsDto } from '../dto/create-local-gps.dto';
import { UpdateLocalDto } from '../dto/update-local.dto';

@ApiTags('Locais')
@ApiExtraModels(CreateLocalGpsDto, CreateLocalWifiDto)
@Controller('locais')
export class LocalController {
    constructor(private readonly localService: LocalService) { }

    @Post()
    @ApiOperation({
        summary: 'Criar um novo local',
        description:
            'Cria um local do tipo GPS ou WIFI automaticamente com base nos campos informados no corpo da requisição.',
    })
    @ApiBody({
        schema: {
            oneOf: [
                { $ref: getSchemaPath(CreateLocalGpsDto) },
                { $ref: getSchemaPath(CreateLocalWifiDto) },
            ],
        },
        examples: {
            GPS: {
                summary: 'Exemplo de Local GPS',
                value: {
                    nome: 'Ponto Central',
                    tipo: 'GPS',
                    latitude: -8.839,
                    longitude: 13.289,
                    raio: 100,
                },
            },
            WIFI: {
                summary: 'Exemplo de Local WIFI',
                value: {
                    nome: 'Rede Principal',
                    tipo: 'WIFI',
                    sinal: ['ISPTEC_WIFI_1', 'ISPTEC_WIFI_2'],
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Local criado com sucesso.' })
    @ApiResponse({ status: 400, description: 'Dados inválidos.' })
    create(@Body() data: CreateLocalGpsDto | CreateLocalWifiDto) {
        return this.localService.create(data);
    }

    @Get()
    @ApiOperation({
        summary: 'Listar todos os locais',
        description:
            'Retorna todos os locais cadastrados (GPS e WIFI). Pode incluir paginação ou filtros no futuro.',
    })
    @ApiResponse({ status: 200, description: 'Lista de locais retornada.' })
    findAll() {
        return this.localService.findAll();
    }

    @Get('/search/by-tipo')
    @ApiOperation({
        summary: 'Filtrar locais por tipo',
        description:
            'Permite buscar locais filtrando por tipo (GPS ou WIFI). Se nenhum tipo for informado, retorna todos.',
    })
    @ApiQuery({ name: 'tipo', required: false, enum: ['GPS', 'WIFI'] })
    @ApiResponse({ status: 200, description: 'Locais filtrados retornados.' })
    findTipo(@Query('tipo') tipo: string) {
        return this.localService.findTipo(tipo);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Buscar local por ID',
        description:
            'Retorna os detalhes de um local específico pelo seu identificador único.',
    })
    @ApiParam({ name: 'id', description: 'ID do local a ser buscado' })
    @ApiResponse({ status: 200, description: 'Local encontrado.' })
    @ApiResponse({ status: 404, description: 'Local não encontrado.' })
    findById(@Param('id') id: string) {
        return this.localService.findById(id);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Atualizar um local existente',
        description:
            'Atualiza os dados de um local existente. Pode ser GPS ou WIFI, conforme o ID informado.',
    })
    @ApiParam({ name: 'id', description: 'ID do local a ser atualizado' })
    @ApiBody({ type: UpdateLocalDto })
    @ApiResponse({ status: 200, description: 'Local atualizado com sucesso.' })
    @ApiResponse({ status: 404, description: 'Local não encontrado.' })
    update(@Param('id') id: string, @Body() data: UpdateLocalDto) {
        return this.localService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Remover um local',
        description:
            'Remove permanentemente um local (GPS ou WIFI) com base no seu ID.',
    })
    @ApiParam({ name: 'id', description: 'ID do local a ser removido' })
    @ApiResponse({ status: 200, description: 'Local removido com sucesso.' })
    @ApiResponse({ status: 404, description: 'Local não encontrado.' })
    delete(@Param('id') id: string) {
        return this.localService.delete(id);
    }

    @Get('/search/by-name')
    @ApiOperation({
        summary: 'Pesquisar locais por nome',
        description:
            'Permite buscar locais que contenham parte do nome informado. Pode ser filtrado por tipo (GPS ou WIFI).',
    })
    @ApiQuery({
        name: 'q',
        required: true,
        description: 'Texto ou parte do nome para pesquisa',
        example: 'ISPTEC',
    })

    @ApiResponse({ status: 200, description: 'Resultados da pesquisa retornados.' })
    search(@Query('nome') query: string) {
        return this.localService.search(query);
    }
}
