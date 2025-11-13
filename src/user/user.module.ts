import { Module } from '@nestjs/common';
import { UserController } from './controller/user-controller.controller';
import { UserService } from './service/user-service';
import { UsersRepository } from './reposistories/user-reposistory';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService,UsersRepository],
  exports: [UserService,UsersRepository]
})
export class UserModule {}
