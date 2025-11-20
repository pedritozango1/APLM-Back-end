import { Injectable } from '@nestjs/common';
import { CreateAnuncioDto } from '../dto/create-anuncio.dto';
import { AnuncioDocument } from '../schema/anuncio.schema';
import { UpdateAnuncioDto } from '../dto/update-anuncioa.dto';
import { AnuncioRepository } from '../reposistory/anuncio.repository';

@Injectable()
export class AnuncioService {
    constructor(private readonly anuncioRepository: AnuncioRepository) {}

    async create(createAnuncioDto: CreateAnuncioDto): Promise<AnuncioDocument> {
        return this.anuncioRepository.create(createAnuncioDto);
    }

    async findAll(): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findAll();
    }

    async findById(id: string): Promise<AnuncioDocument> {
        return this.anuncioRepository.findById(id);
    }

    async findByModoEntrega(modoEntrega: string): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findByModoEntrega(modoEntrega);
    }

    async findByPolitica(politica: string): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findByPolitica(politica);
    }

    async findByLocal(local: string): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findByLocal(local);
    }

    async findAtivos(): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findAtivos();
    }

    async findFuturos(): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findFuturos();
    }

    async findExpirados(): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findExpirados();
    }

    async findByPeriodo(dataInicio: string, dataFim: string): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.findByPeriodo(dataInicio, dataFim);
    }

    async search(query: string): Promise<AnuncioDocument[]> {
        return this.anuncioRepository.search(query);
    }

    async update(id: string, updateAnuncioDto: UpdateAnuncioDto): Promise<AnuncioDocument | null> {
        return this.anuncioRepository.update(id, updateAnuncioDto);
    }

    async delete(id: string): Promise<AnuncioDocument> {
        return this.anuncioRepository.delete(id);
    }

    async count(): Promise<number> {
        return this.anuncioRepository.count();
    }

    async countAtivos(): Promise<number> {
        return this.anuncioRepository.countAtivos();
    }

    async isAtivo(id: string): Promise<boolean> {
        return this.anuncioRepository.isAtivo(id);
    }

    async deleteExpirados(): Promise<{ deletedCount: number }> {
        return this.anuncioRepository.deleteExpirados();
    }
}