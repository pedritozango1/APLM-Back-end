import { Injectable } from '@nestjs/common';
import { LocalRepository } from '../repository/local.repository';
@Injectable()
export class LocalService {
  constructor(private readonly localRepository: LocalRepository) {}

  create(data: any) {
    return this.localRepository.create(data);
  }

  findAll() {
    return this.localRepository.findAll();
  }
 findTipo(tipo:string) {
    return this.localRepository.findTipo(tipo);
  }
  findById(id: string) {
    return this.localRepository.findById(id);
  }

  update(id: string, data: any) {
    return this.localRepository.update(id, data);
  }

  delete(id: string) {
    return this.localRepository.delete(id);
  }

  search(nome: string) {
    return this.localRepository.search(nome);
  }
}
