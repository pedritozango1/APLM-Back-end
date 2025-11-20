import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Anuncio, AnuncioDocument } from '../schema/anuncio.schema';
import { CreateAnuncioDto } from '../dto/create-anuncio.dto';
import { UpdateAnuncioDto } from '../dto/update-anuncioa.dto';


@Injectable()
export class AnuncioRepository {
    constructor(
        @InjectModel(Anuncio.name) private readonly anuncioModel: Model<AnuncioDocument>,
    ) {}

    /**
     * Criar novo anúncio
     */
    async create(data: CreateAnuncioDto): Promise<AnuncioDocument> {
        // Validação de datas
        const inicio = new Date(data.inicio);
        const fim = new Date(data.fim);

        if (inicio >= fim) {
            throw new BadRequestException('A data de início deve ser anterior à data de fim');
        }

        return this.anuncioModel.create({
            ...data,
            inicio,
            fim,
        });
    }

    /**
     * Buscar todos os anúncios
     */
    async findAll(): Promise<AnuncioDocument[]> {
        return this.anuncioModel.find().sort({ createdAt: -1 }).exec();
    }

    /**
     * Buscar anúncio por ID
     */
    async findById(id: string): Promise<AnuncioDocument> {
        const anuncio = await this.anuncioModel.findById(id).exec();
        
        if (!anuncio) {
            throw new NotFoundException('Anúncio não encontrado.');
        }
        
        return anuncio;
    }

    /**
     * Buscar anúncios por modo de entrega
     */
    async findByModoEntrega(modoEntrega: string): Promise<AnuncioDocument[]> {
        if (!['centralizado', 'descentralizado'].includes(modoEntrega)) {
            throw new BadRequestException('Modo de entrega inválido');
        }
        
        return this.anuncioModel.find({ modoEntrega }).sort({ createdAt: -1 }).exec();
    }

    /**
     * Buscar anúncios por política de visibilidade
     */
    async findByPolitica(politica: string): Promise<AnuncioDocument[]> {
        if (!['whitelist', 'blacklist'].includes(politica)) {
            throw new BadRequestException('Política inválida');
        }
        
        return this.anuncioModel.find({ politica }).sort({ createdAt: -1 }).exec();
    }

    /**
     * Buscar anúncios por local
     */
    async findByLocal(local: string): Promise<AnuncioDocument[]> {
        if (!local) {
            throw new BadRequestException('Parâmetro "local" é obrigatório.');
        }
        
        return this.anuncioModel
            .find({ local: { $regex: local, $options: 'i' } })
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Buscar anúncios ativos (dentro da janela temporal)
     */
    async findAtivos(): Promise<AnuncioDocument[]> {
        const now = new Date();
        
        return this.anuncioModel
            .find({
                inicio: { $lte: now },
                fim: { $gte: now },
            })
            .sort({ inicio: 1 })
            .exec();
    }

    /**
     * Buscar anúncios futuros
     */
    async findFuturos(): Promise<AnuncioDocument[]> {
        const now = new Date();
        
        return this.anuncioModel
            .find({
                inicio: { $gt: now },
            })
            .sort({ inicio: 1 })
            .exec();
    }

    /**
     * Buscar anúncios expirados
     */
    async findExpirados(): Promise<AnuncioDocument[]> {
        const now = new Date();
        
        return this.anuncioModel
            .find({
                fim: { $lt: now },
            })
            .sort({ fim: -1 })
            .exec();
    }

    /**
     * Buscar anúncios por período
     */
    async findByPeriodo(dataInicio: string, dataFim: string): Promise<AnuncioDocument[]> {
        const inicio = new Date(dataInicio);
        const fim = new Date(dataFim);

        if (inicio >= fim) {
            throw new BadRequestException('A data de início deve ser anterior à data de fim');
        }

        return this.anuncioModel
            .find({
                $or: [
                    // Anúncios que começam dentro do período
                    { inicio: { $gte: inicio, $lte: fim } },
                    // Anúncios que terminam dentro do período
                    { fim: { $gte: inicio, $lte: fim } },
                    // Anúncios que englobam todo o período
                    { inicio: { $lte: inicio }, fim: { $gte: fim } },
                ],
            })
            .sort({ inicio: 1 })
            .exec();
    }

    /**
     * Buscar anúncios por título ou mensagem
     */
    async search(query: string): Promise<AnuncioDocument[]> {
        if (!query) {
            throw new BadRequestException('Parâmetro "q" é obrigatório.');
        }

        return this.anuncioModel
            .find({
                $or: [
                    { titulo: { $regex: query, $options: 'i' } },
                    { mensagem: { $regex: query, $options: 'i' } },
                ],
            })
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Atualizar anúncio
     */
    async update(id: string, data: UpdateAnuncioDto): Promise<AnuncioDocument | null> {
        const anuncio = await this.anuncioModel.findById(id).exec();
        
        if (!anuncio) {
            throw new NotFoundException('Anúncio não encontrado.');
        }

        // Validação de datas se foram fornecidas
        if (data.inicio || data.fim) {
            const inicio = data.inicio ? new Date(data.inicio) : anuncio.inicio;
            const fim = data.fim ? new Date(data.fim) : anuncio.fim;

            if (inicio >= fim) {
                throw new BadRequestException('A data de início deve ser anterior à data de fim');
            }
        }

        const updateData = {
            ...data,
            inicio: data.inicio ? new Date(data.inicio) : undefined,
            fim: data.fim ? new Date(data.fim) : undefined,
        };

        return this.anuncioModel.findByIdAndUpdate(id, updateData, { 
            new: true, 
            runValidators: true 
        }).exec();
    }

    /**
     * Deletar anúncio
     */
    async delete(id: string): Promise<AnuncioDocument> {
        console.log('Deletando anúncio:', id);
        
        const deleted = await this.anuncioModel.findByIdAndDelete(id).exec();
        
        if (!deleted) {
            throw new NotFoundException('Anúncio não encontrado.');
        }
        
        return deleted;
    }

    /**
     * Contar anúncios
     */
    async count(): Promise<number> {
        return this.anuncioModel.countDocuments().exec();
    }

    /**
     * Contar anúncios ativos
     */
    async countAtivos(): Promise<number> {
        const now = new Date();
        
        return this.anuncioModel
            .countDocuments({
                inicio: { $lte: now },
                fim: { $gte: now },
            })
            .exec();
    }

    /**
     * Verificar se um anúncio está ativo
     */
    async isAtivo(id: string): Promise<boolean> {
        const anuncio = await this.findById(id);
        const now = new Date();
        
        return anuncio.inicio <= now && anuncio.fim >= now;
    }

    /**
     * Deletar anúncios expirados
     */
    async deleteExpirados(): Promise<{ deletedCount: number }> {
        const now = new Date();
        
        const result = await this.anuncioModel
            .deleteMany({
                fim: { $lt: now },
            })
            .exec();
        
        return { deletedCount: result.deletedCount };
    }
}