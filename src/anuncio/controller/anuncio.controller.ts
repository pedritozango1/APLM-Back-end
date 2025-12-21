import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBody,
} from '@nestjs/swagger';
import { AnuncioService } from '../service/anuncio.service';
import { CreateAnuncioDto } from '../dto/create-anuncio.dto';
import { UpdateAnuncioDto } from '../dto/update-anuncioa.dto';
import { CreateLocalGpsDto } from 'src/local/dto/create-local-gps.dto';
import { AnunciosProximosDto } from '../dto/anucio-proximo.dto';


@ApiTags('anuncios')
@Controller('anuncios')
export class AnuncioController {
    constructor(private readonly anuncioService: AnuncioService) { }

    @Post()
    @ApiOperation({ summary: 'Criar novo anúncio' })
    @ApiResponse({ status: 201, description: 'Anúncio criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    async create(@Body() createAnuncioDto: CreateAnuncioDto) {
        return this.anuncioService.create(createAnuncioDto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os anúncios' })
    @ApiResponse({ status: 200, description: 'Lista de anúncios retornada com sucesso' })
    async findAll() {
        return this.anuncioService.findAll();
    }
    @Get("findUsuarios/:id")
    @ApiParam({ name: "id" })
    @ApiOperation({ summary: 'Listar todos os anúncios por usuario' })
    @ApiResponse({ status: 200, description: 'Lista de anúncios por usario retornada com sucesso' })
    async findUsuarios(@Param("id") id: string) {
        return this.anuncioService.findUsuarios(id);
    }

    @Get('ativos')
    @ApiOperation({ summary: 'Listar anúncios ativos' })
    @ApiResponse({ status: 200, description: 'Lista de anúncios ativos' })
    async findAtivos() {
        return this.anuncioService.findAtivos();
    }

    @Get('futuros')
    @ApiOperation({ summary: 'Listar anúncios futuros' })
    @ApiResponse({ status: 200, description: 'Lista de anúncios futuros' })
    async findFuturos() {
        return this.anuncioService.findFuturos();
    }

    @Get('expirados')
    @ApiOperation({ summary: 'Listar anúncios expirados' })
    @ApiResponse({ status: 200, description: 'Lista de anúncios expirados' })
    async findExpirados() {
        return this.anuncioService.findExpirados();
    }

    @Get('count')
    @ApiOperation({ summary: 'Contar total de anúncios' })
    @ApiResponse({ status: 200, description: 'Total de anúncios' })
    async count() {
        const total = await this.anuncioService.count();
        return { total };
    }
    @Get('testar')
    @ApiOperation({ summary: 'Lista de todos os anuncios' })
    @ApiResponse({ status: 200, description: 'anucioe localizados' })
    async testarAnunciosProximos() {
        return await this.anuncioService.testarAnunciosProximos();
       
    }

    @Get('count/ativos')
    @ApiOperation({ summary: 'Contar anúncios ativos' })
    @ApiResponse({ status: 200, description: 'Total de anúncios ativos' })
    async countAtivos() {
        const total = await this.anuncioService.countAtivos();
        return { total };
    }

    @Get('search')
    @ApiOperation({ summary: 'Buscar anúncios por título ou mensagem' })
    @ApiQuery({ name: 'q', required: true, description: 'Termo de busca' })
    @ApiResponse({ status: 200, description: 'Anúncios encontrados' })
    async search(@Query('q') query: string) {
        return this.anuncioService.search(query);
    }

    @Get('search/by-local')
    @ApiOperation({ summary: 'Buscar anúncios por local' })
    @ApiQuery({ name: 'q', required: true, description: 'Local' })
    @ApiResponse({ status: 200, description: 'Anúncios encontrados' })
    async searchByLocal(@Query('q') local: string) {
        return this.anuncioService.findByLocal(local);
    }

    @Get('search/by-periodo')
    @ApiOperation({ summary: 'Buscar anúncios por período' })
    @ApiQuery({ name: 'inicio', required: true, description: 'Data de início (ISO)' })
    @ApiQuery({ name: 'fim', required: true, description: 'Data de fim (ISO)' })
    @ApiResponse({ status: 200, description: 'Anúncios encontrados' })
    async searchByPeriodo(
        @Query('inicio') inicio: string,
        @Query('fim') fim: string,
    ) {
        return this.anuncioService.findByPeriodo(inicio, fim);
    }

    @Get('modo-entrega/:modo')
    @ApiOperation({ summary: 'Buscar anúncios por modo de entrega' })
    @ApiParam({ name: 'modo', enum: ['centralizado', 'descentralizado'] })
    @ApiResponse({ status: 200, description: 'Anúncios encontrados' })
    async findByModoEntrega(@Param('modo') modo: string) {
        return this.anuncioService.findByModoEntrega(modo);
    }

    @Get('politica/:politica')
    @ApiOperation({ summary: 'Buscar anúncios por política' })
    @ApiParam({ name: 'politica', enum: ['whitelist', 'blacklist'] })
    @ApiResponse({ status: 200, description: 'Anúncios encontrados' })
    async findByPolitica(@Param('politica') politica: string) {
        return this.anuncioService.findByPolitica(politica);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar anúncio por ID' })
    @ApiParam({ name: 'id', description: 'ID do anúncio' })
    @ApiResponse({ status: 200, description: 'Anúncio encontrado' })
    @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
    async findById(@Param('id') id: string) {
        return this.anuncioService.findById(id);
    }

    @Get(':id/is-ativo')
    @ApiOperation({ summary: 'Verificar se anúncio está ativo' })
    @ApiParam({ name: 'id', description: 'ID do anúncio' })
    @ApiResponse({ status: 200, description: 'Status do anúncio' })
    async isAtivo(@Param('id') id: string) {
        const ativo = await this.anuncioService.isAtivo(id);
        return { ativo };
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar anúncio' })
    @ApiParam({ name: 'id', description: 'ID do anúncio' })
    @ApiResponse({ status: 200, description: 'Anúncio atualizado com sucesso' })
    @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
    async update(
        @Param('id') id: string,
        @Body() updateAnuncioDto: UpdateAnuncioDto,
    ) {
        return this.anuncioService.update(id, updateAnuncioDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Deletar anúncio' })
    @ApiParam({ name: 'id', description: 'ID do anúncio' })
    @ApiResponse({ status: 200, description: 'Anúncio deletado com sucesso' })
    @ApiResponse({ status: 404, description: 'Anúncio não encontrado' })
    async delete(@Param('id') id: string) {
        return this.anuncioService.delete(id);
    }

    @Delete('cleanup/expirados')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Deletar todos os anúncios expirados' })
    @ApiResponse({ status: 200, description: 'Anúncios expirados deletados' })
    async deleteExpirados() {
        return this.anuncioService.deleteExpirados();
    }

    @Get('proximos/:username')
    @ApiOperation({ summary: 'Listar anúncios próximos com base na localização do usuário' })
    @ApiParam({ name: 'username', description: 'Username do utilizador' })
    @ApiBody({ type: AnunciosProximosDto })
    @ApiResponse({ status: 200, description: 'Lista de anúncios próximos' })
    async anunciosProximos(
        @Param('username') username: string,
        @Body() localizacaoActualUsuario: AnunciosProximosDto,
    ) {
        return this.anuncioService.anunciosProximos(localizacaoActualUsuario, username);
    }
}