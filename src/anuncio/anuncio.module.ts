import { Module } from '@nestjs/common';
import { AnuncioController } from './controller/anuncio.controller';
import { AnuncioService } from './service/anuncio.service';
import { AnuncioRepository } from './reposistory/anuncio.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Anuncio, AnuncioSchema } from './schema/anuncio.schema';
import { LocalModule } from 'src/local/local.module';
import { UserModule } from 'src/user/user.module';
import { ReportarLocalizacaoController } from './controller/reporta-localizacao.controller';
import { ReportarLocalizacaoService } from './service/Reportar-localizacao';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Anuncio.name,schema:AnuncioSchema}
  ]),LocalModule,UserModule],
  controllers: [AnuncioController,ReportarLocalizacaoController],
  providers: [AnuncioService,ReportarLocalizacaoService,AnuncioRepository],
  exports: [AnuncioService,ReportarLocalizacaoService,AnuncioRepository]
})
export class AnuncioModule {}
