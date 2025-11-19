import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Perfil } from '../schema/perfil.schema';
import { PerfilRepository } from '../repository/service.repository';
import { CreatePerfilDto } from '../dto/create-perfil.dto';
import { UpdatePerfilDto } from '../dto/update-perfil.dto';


@Injectable()
export class PerfilService {
  constructor(private readonly perfilRepository: PerfilRepository) {}

  // Criar novo Perfil
  async createPerfil(data: CreatePerfilDto): Promise<Perfil> {
    // Criar
    return this.perfilRepository.create(data);
  }

  // Listar todos
  async getAllPerfis(): Promise<Perfil[]> {
    return this.perfilRepository.findAll();
  }

  // Buscar por ID
  async getPerfilById(id: string): Promise<Perfil> {
    const perfil = await this.perfilRepository.findById(id);
    if (!perfil) throw new NotFoundException('Perfil não encontrado');
    return perfil;
  }

  // Atualizar
  async updatePerfil(id: string, data: UpdatePerfilDto): Promise<Perfil | null> {
    const perfilAtual = await this.perfilRepository.findById(id);
    if (!perfilAtual) throw new NotFoundException('Perfil não encontrado');

    return this.perfilRepository.update(id, data);
  }

  // Remover
  async deletePerfil(id: string): Promise<void> {
    const perfil = await this.perfilRepository.findById(id);
    if (!perfil) throw new NotFoundException('Perfil não encontrado');

    await this.perfilRepository.remove(id);
  }
}
