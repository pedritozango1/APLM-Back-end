import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Perfil, PerfilDocument } from '../schema/perfil.schema';
import { CreatePerfilDto } from '../dto/create-perfil.dto';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';


@Injectable()
export class PerfilRepository {
  constructor(
    @InjectModel(Perfil.name)
    private readonly perfilModel: Model<PerfilDocument>,
  ) {}

  // Criar
  async create(data:CreatePerfilDto): Promise<Perfil> {
    return this.perfilModel.create(data);
  }

  // Buscar todos
  async findAll(): Promise<Perfil[]> {
    return this.perfilModel.find().exec();
  }

  // Buscar um
  async findById(id: string): Promise<Perfil | null> {
    return this.perfilModel.findById(id).exec();
  }

  // Buscar por chave
  async findByChave(chave: string): Promise<Perfil | null> {
    return this.perfilModel.findOne({ chave }).exec();
  }

  // Atualizar
  async update(id: string, data: UpdatePerfilDto): Promise<Perfil | null> {
    return this.perfilModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  // Remover
  async remove(id: string): Promise<Perfil | null> {
    return this.perfilModel.findByIdAndDelete(id).exec();
  }
}
