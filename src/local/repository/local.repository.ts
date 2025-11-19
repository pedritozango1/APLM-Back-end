import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Local } from '../schema/local.schema';
import { LocalGPSSchema } from '../schema/local-gps.schema';
import { LocalWifiSchema } from '../schema/local-wifi.schema';

@Injectable()
export class LocalRepository {
    constructor(
        @InjectModel(Local.name) private readonly localModel: Model<Local>,
    ) { }

    async create(data: any) {
      return this.localModel.create(data);
    }

    async findAll() {
        return this.localModel.find();
    }
    async findTipo(tipo: string) {
        return this.localModel.find({ tipo });
    }
    async findById(id: string) {
        const local = await this.localModel.findById(id);
        if (!local) throw new NotFoundException('Local não encontrado.');
        return local;
    }

    async update(id: string, data: any) {
        const local = await this.localModel.findById(id);
        if (!local) throw new NotFoundException('Local não encontrado.');

        return this.localModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        console.log(id);
        const deleted = await this.localModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Local não encontrado.');
        return deleted;
    }

    async search(nome: String) {
        if (!nome) throw new BadRequestException('Parâmetro "q" é obrigatório.');
        return this.localModel.find({ nome: nome });
    }
}
