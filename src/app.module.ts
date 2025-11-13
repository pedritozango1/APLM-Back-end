import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://pedritozango1:5EPvaVewtCc4uCqN@cluster0.quejkac.mongodb.net/authdb?retryWrites=true&w=majority')
,
    UserModule, AuthModule],
 
})
export class AppModule {}
