import { Module } from '@nestjs/common';
import { AnuncioController } from './controller/anuncio.controller';
import { AnuncioService } from './service/anuncio.service';
import { AnuncioRepository } from './reposistory/anuncio.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Anuncio, AnuncioSchema } from './schema/anuncio.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:Anuncio.name,schema:AnuncioSchema}
  ])],
  controllers: [AnuncioController],
  providers: [AnuncioService,AnuncioRepository],
  exports: [AnuncioService,AnuncioRepository]
})
export class AnuncioModule {}
