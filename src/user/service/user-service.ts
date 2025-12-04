import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../reposistories/user-reposistory';
import { User } from '../schema/user-schema';
import { CreatePerfilDto } from '../dto/perfil-dto';
import { ChaveRepository } from 'src/chave/repository/chave.repository';
import { CreateChaveDto } from 'src/chave/dto/create-chavedto';
import { Perfil } from '../schema/perfil.schema';


@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository,
    private readonly chaveRepository: ChaveRepository
  ) { }

  async create(username: string, password: string): Promise<User> {
    const existing = await this.usersRepository.findByUsername(username);
    if (existing) throw new ConflictException('Nome de utilizador já existe');
    const hashed = await bcrypt.hash(password, 10);
    return this.usersRepository.create(username, hashed);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findByUsername(username);
  }
  async findByPerfil(_idUser: string): Promise<Perfil[] | null> {

    return this.usersRepository.findByPerfil(_idUser);
  }
  async findAll(): Promise<User[] | null> {
    return this.usersRepository.findAll();
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
  }

  async addPerfil(idUsuario: string, perfilDto: CreatePerfilDto): Promise<any> {
    const chave = await this.chaveRepository.findByNome(perfilDto.chave)
     console.log("chave=>", chave);
    if (!chave) {
      const chave = new CreateChaveDto;
      chave.nome = perfilDto.chave;
      const nova = await this.chaveRepository.create(chave);
    }
    const add=await this.usersRepository.addPerfil(idUsuario, perfilDto)
    console.log(add)
    return add;
  }

  async removerPerfil(idUsuario: string, idPerfil: string): Promise<any> {
    return this.usersRepository.removerPerfil(idUsuario, idPerfil);
  }

  async editarPerfil(idUsuario: string, perfilDto: CreatePerfilDto): Promise<any> {
    return this.usersRepository.editarPerfil(idUsuario, perfilDto);
  }
}
