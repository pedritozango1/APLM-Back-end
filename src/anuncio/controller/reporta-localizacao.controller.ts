// controller/localizacao.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportarLocalizacaoDto } from '../dto/reportal-localizacao.dto';
import { ReportarLocalizacaoService } from '../service/Reportar-localizacao';

@ApiTags('localizacao')
@Controller('Repostarlocalizacao')
export class ReportarLocalizacaoController {
  constructor(private readonly localizacaoService: ReportarLocalizacaoService) {}

  @Post('reportar')
  @ApiOperation({ summary: 'Reportar localização atual do usuário' })
  async reportarLocalizacao(@Body() data: ReportarLocalizacaoDto) {
    const anunciosDisponiveis = await this.localizacaoService.processarLocalizacao(data);
    return {
      timestamp: new Date().toISOString(),
      anunciosDisponiveis: anunciosDisponiveis.length,
      anuncios: anunciosDisponiveis,
    };
  }
}