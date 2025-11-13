import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth-controller';
import { AuthService } from './service/auth-service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schema/sessao';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Session.name,schema:SessionSchema}]),UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
