import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chave, ChaveDocument } from '../schema/chave.schema';
import { CreateChaveDto } from '../dto/create-chavedto';

@Injectable()
export class ChaveRepository {
  constructor(
    @InjectModel(Chave.name)
    private readonly chaveModel: Model<ChaveDocument>,
  ) { }

  // Criar chave pública
  async create(data: CreateChaveDto): Promise<Chave> {
    return await this.chaveModel.create(data);
  }

  // Listar todas
  async findAll(): Promise<Chave[]> {
    return await this.chaveModel.find().exec();
  }

  // Buscar por ID
  async findById(id: string): Promise<Chave | null> {
    return await this.chaveModel.findById(id).exec();
  }

  // Buscar por nome
  async findByNome(nome: string): Promise<Chave | null> {
    return await this.chaveModel.findOne({ nome }).exec();
  }

  // Atualizar
  async update(id: string, data: Partial<CreateChaveDto>): Promise<Chave | null> {
    return await this.chaveModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Remover
  async remove(id: string): Promise<Chave | null> {
    return await this.chaveModel.findByIdAndDelete(id).exec();
  }
}
