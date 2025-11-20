import { Module } from '@nestjs/common';
import { PerfilController } from './controller/perfil.controller';
import { PerfilService } from './service/perfil.service';
import { PerfilRepository } from './repository/service.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Perfil, PerfilSchema } from './schema/perfil.schema';

@Module({
  
   imports: [
    MongooseModule.forFeature([{ name: Perfil.name, schema: PerfilSchema }]),
  ],
  controllers: [PerfilController],
  providers: [PerfilService,PerfilRepository],
  exports: [PerfilService,PerfilRepository]
})
export class PerfilModule {}
