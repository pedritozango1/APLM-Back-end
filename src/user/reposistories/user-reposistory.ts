import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schema/user-schema';
import { CreatePerfilDto } from '../dto/perfil-dto';
import { Perfil } from '../schema/perfil.schema';


@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(username: string, password: string): Promise<User> {
    const user = new this.userModel({ username, password });
    return user.save();
  }
 async addPerfil(idUsuario: string, perfilDto: CreatePerfilDto): Promise<any> {
  //Mongoose vai gerar o _id automaticamente
  const novoPerfil = {
    chave: perfilDto.chave,
    valor: perfilDto.valor
  };

  // Adiciona ao array
  const resultado = await this.userModel.findOneAndUpdate(
    { _id: idUsuario },
    { $push: { perfil: novoPerfil } },
    { new: true, select: 'perfil' } // Retorna apenas o campo perfil atualizado
  );

  if (!resultado) {
    throw new NotFoundException('Usuário não encontrado');
  }

  //Retorna o último perfil adicionado (o mais recente)
  const perfilCriado = resultado.perfil![resultado.perfil!.length - 1];
  return perfilCriado;
}

  async removerPerfil(idUsuario: string, idPerfil: string): Promise<any> {
    return this.userModel.updateOne(
      { _id: idUsuario },
      { $pull: { perfil: { _id: idPerfil } } }
    );
  }

  async editarPerfil(idUsuario: string, perfilDto: CreatePerfilDto): Promise<any> {
    return this.userModel.updateOne(
      { _id: idUsuario, "perfil.chave": perfilDto.chave },
      { $set: { "perfil.$.valor": perfilDto.valor } }
    );
  }
  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
  async findByPerfil(_idUser: string): Promise<Perfil[] | null> {
    const user = await this.userModel.findOne(
      { _id: _idUser },
      { perfil: 1, _id: 0 }
    ).exec();

    return (user && user.perfil) ? user.perfil : null;
  }

  async findAll(): Promise<User[] | null> {
    return this.userModel.find();
  }
}
