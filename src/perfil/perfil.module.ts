import { Module } from '@nestjs/common';
import { PerfilController } from './controller/perfil.controller';
import { PerfilService } from './service/perfil.service';

@Module({
  controllers: [PerfilController],
  providers: [PerfilService]
})
export class PerfilModule {}
