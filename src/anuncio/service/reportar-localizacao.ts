// service/localizacao.service.ts
import { Injectable } from '@nestjs/common';
import { ReportarLocalizacaoDto } from '../dto/reportal-localizacao.dto';
import { AnuncioRepository } from '../reposistory/anuncio.repository';

@Injectable()
export class ReportarLocalizacaoService {
  constructor(private readonly anuncioRepository: AnuncioRepository) {}

  async processarLocalizacao(data: ReportarLocalizacaoDto) {
    console.log('Processando localização:', {
      username: data.username,
      latitude: data.latitude,
      longitude: data.longitude,
      ssids: data.ssids?.length || 0
    });

    try {
      // 1. Buscar anúncios próximos baseado na localização
      const anunciosProximos = await this.anuncioRepository.anunciosProximos(
        {
          latitude: data.latitude,
          longitude: data.longitude,
          ssids: data.ssids || []
        },
        data.username
      );

      console.log(`Anúncios próximos encontrados: ${anunciosProximos.length}`);

      // 2. Retornar informações básicas
      const resultado = anunciosProximos.map((anuncio:any) => ({
        id: anuncio._id,
        titulo: anuncio.titulo,
        mensagem: anuncio.mensagem.substring(0, 100) + '...', // Primeiros 100 caracteres
        local: anuncio.local ? {
          nome: anuncio.local.nome,
          tipo: anuncio.local.tipo
        } : null,
        usuario: anuncio.user ? {
          username: anuncio.user.username
        } : null,
        modoEntrega: anuncio.modoEntrega,
        politica: anuncio.politica,
        inicio: anuncio.inicio,
        fim: anuncio.fim
      }));

      console.log('Resultado processado:', resultado.length, 'anúncios');
      return resultado;

    } catch (error) {
      console.error('Erro ao processar localização:', error);
      throw error;
    }
  }
}