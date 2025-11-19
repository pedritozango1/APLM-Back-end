import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../reposistories/user-reposistory';
import { User } from '../schema/user-schema';


@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(username: string, password: string): Promise<User> {
    const existing = await this.usersRepository.findByUsername(username);
    if (existing) throw new ConflictException('Nome de utilizador já existe');
    const hashed = await bcrypt.hash(password, 10);
    return this.usersRepository.create(username, hashed);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findByUsername(username);
  }
  async findAll(): Promise<User[] | null> {
    return this.usersRepository.findAll();
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    console.log(valid ? user : null);
    return valid ? user : null;
  }
}
