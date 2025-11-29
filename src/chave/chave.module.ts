import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chave, ChaveSchema } from './schema/chave.schema';
import { ChaveService } from './service/chave.service';
import { ChaveRepository } from './repository/chave.repository';
import { ChaveController } from './controller/chave.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chave.name, schema: ChaveSchema }]),
  ],
  controllers: [ChaveController],
  providers: [ChaveService, ChaveRepository],
  exports: [ChaveService, ChaveRepository],
})
export class ChaveModule {}
