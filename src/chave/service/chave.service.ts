import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ChaveRepository } from '../repository/chave.repository';
import { CreateChaveDto } from '../dto/create-chavedto';

@Injectable()
export class ChaveService {
  constructor(private readonly chaveRepository: ChaveRepository) {}

  // Criar nova chave pública
  async create(data: CreateChaveDto) {
    
    const existe = await this.chaveRepository.findByNome(data.nome);

    if (existe) {
      throw new ConflictException('Chave já existe na lista pública');
    }

    return this.chaveRepository.create(data);
  }

  // Buscar todas
  async getAll() {
    return this.chaveRepository.findAll();
  }

  // Buscar uma
  async getById(id: string) {
    const chave = await this.chaveRepository.findById(id);

    if (!chave) {
      throw new NotFoundException('Chave não encontrada');
    }

    return chave;
  }

  // Atualizar
  async update(id: string, data: Partial<CreateChaveDto>) {
    const chave = await this.chaveRepository.findById(id);

    if (!chave) throw new NotFoundException('Chave não encontrada');

    return this.chaveRepository.update(id, data);
  }

  // Deletar
  async delete(id: string) {
    const chave = await this.chaveRepository.findById(id);

    if (!chave) throw new NotFoundException('Chave não encontrada');

    return this.chaveRepository.remove(id);
  }
}
