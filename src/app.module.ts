import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalModule } from './local/local.module';
import { AnuncioModule } from './anuncio/anuncio.module';
import { ChaveModule } from './chave/chave.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pedritozango1:5EPvaVewtCc4uCqN@cluster0.quejkac.mongodb.net/authdb?retryWrites=true&w=majority')
,
    UserModule, AuthModule, LocalModule, ChaveModule, AnuncioModule],
 
})
export class AppModule {}
