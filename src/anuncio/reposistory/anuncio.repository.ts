import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Anuncio, AnuncioDocument } from '../schema/anuncio.schema';
import { CreateAnuncioDto } from '../dto/create-anuncio.dto';
import { UpdateAnuncioDto } from '../dto/update-anuncioa.dto';
import { LocalRepository } from 'src/local/repository/local.repository';
import { LocalGPS } from 'src/local/schema/local-gps.schema';
import { CreateLocalGpsDto } from 'src/local/dto/create-local-gps.dto';
import { LocalDocument } from 'src/local/schema/local.schema';
import { UsersRepository } from 'src/user/reposistories/user-reposistory';
import { Perfil } from 'src/user/schema/perfil.schema';
import { AnunciosProximosDto } from '../dto/anucio-proximo.dto';
import { ReportarLocalizacaoDto } from '../dto/reportal-localizacao.dto';

@Injectable()
export class AnuncioRepository {
    constructor(
        @InjectModel(Anuncio.name) private readonly anuncioModel: Model<AnuncioDocument>,
        private localRepository: LocalRepository,
        private usuarioReposistory: UsersRepository
    ) { }

    /**
     * Criar novo anúncio
     */
    async create(data: CreateAnuncioDto): Promise<AnuncioDocument | null> {
        // Validação de datas
        const inicio = new Date(data.inicio);
        const fim = new Date(data.fim);

        if (inicio >= fim) {
            throw new BadRequestException('A data de início deve ser anterior à data de fim');
        }

        const created = await this.anuncioModel.create(data);

        // Retornar com populate
        return await this.anuncioModel
            .findById(created._id)
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .exec();
    }

    /**
     * Buscar todos os anúncios
     */
    async findAll(): Promise<AnuncioDocument[]> {
        return await this.anuncioModel
            .find()
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Buscar anúncio por ID
     */
    async findById(id: string): Promise<AnuncioDocument> {
        const anuncio = await this.anuncioModel
            .findById(id)
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .exec();

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

        return await this.anuncioModel
            .find({ modoEntrega })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Buscar anúncios por política de visibilidade
     */
    async findByPolitica(politica: string): Promise<AnuncioDocument[]> {
        if (!['whitelist', 'blacklist'].includes(politica)) {
            throw new BadRequestException('Política inválida');
        }

        return await this.anuncioModel
            .find({ politica })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Buscar anúncios por local
     */
    async findByLocal(localId: string): Promise<AnuncioDocument[]> {
        if (!localId) {
            throw new BadRequestException('Parâmetro "local" é obrigatório.');
        }

        return await this.anuncioModel
            .find({ local: localId })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .sort({ createdAt: -1 })
            .exec();
    }

    /**
     * Buscar anúncios ativos (dentro da janela temporal)
     */
    async findAtivos(): Promise<AnuncioDocument[]> {
        const now = new Date();

        return await this.anuncioModel
            .find({
                inicio: { $lte: now },
                fim: { $gte: now },
            })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .sort({ inicio: 1 })
            .exec();
    }
    async findUsuarios(_idUsaurio: string): Promise<AnuncioDocument[]> {
        const now = new Date();

        return await this.anuncioModel
            .find({ user: _idUsaurio })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .sort({ inicio: 1 })
            .exec();
    }

    /**
     * Buscar anúncios futuros
     */
    async findFuturos(): Promise<AnuncioDocument[]> {
        const now = new Date();

        return await this.anuncioModel
            .find({
                inicio: { $gt: now },
            })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .sort({ inicio: 1 })
            .exec();
    }

    /**
     * Buscar anúncios expirados
     */
    async findExpirados(): Promise<AnuncioDocument[]> {
        const now = new Date();

        return await this.anuncioModel
            .find({
                fim: { $lt: now },
            })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
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

        return await this.anuncioModel
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
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
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

        return await this.anuncioModel
            .find({
                $or: [
                    { titulo: { $regex: query, $options: 'i' } },
                    { mensagem: { $regex: query, $options: 'i' } },
                ],
            })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
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

        return this.anuncioModel
            .findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true,
            })
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .exec();
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
        return await this.anuncioModel.countDocuments().exec();
    }

    /**
     * Contar anúncios ativos
     */
    async countAtivos(): Promise<number> {
        const now = new Date();

        return await this.anuncioModel
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
    //aqui é onde deves fazer isso
async anunciosProximos(
    localizacaoActualUsuario: AnunciosProximosDto,
    username: string
): Promise<AnuncioDocument[]> {
    try {
        console.log('=== INICIANDO BUSCA POR ANÚNCIOS PRÓXIMOS ===');
        console.log('Usuário:', username);
        console.log('Localização:', localizacaoActualUsuario);

        // 1. Buscar todos os anúncios centralizados ativos
        const agora = new Date();
        console.log('Data atual:', agora.toISOString());

        const query = { 
            modoEntrega: 'centralizado',
            inicio: { $lte: agora },
            fim: { $gte: agora }
        };
        console.log('Query MongoDB:', JSON.stringify(query));

        const todosAnuncios = await this.anuncioModel
            .find(query)
            .populate('local')
            .populate('user')
            .populate('listaChave.chaveId')
            .exec();

        console.log(`Total de anúncios ativos: ${todosAnuncios.length}`);

        // Debug: mostrar estrutura dos anúncios
        todosAnuncios.forEach((anuncio, index) => {
            console.log(`\nAnúncio ${index + 1}:`);
            console.log(`- ID: ${anuncio._id}`);
            console.log(`- Título: ${anuncio.titulo}`);
            console.log(`- Local:`, anuncio.local);
            console.log(`- ListaChave:`, anuncio.listaChave);
            console.log(`- Política: ${anuncio.politica}`);
        });

        // 2. Buscar usuário e seu perfil
        console.log(`\nBuscando usuário: ${username}`);
        const usuario = await this.usuarioReposistory.findByUsername(username);
        
        if (!usuario) {
            console.log(`❌ Usuário ${username} não encontrado`);
            return [];
        }

        console.log(`✅ Usuário encontrado: ${usuario.username}`);
        const perfilUsuario = usuario.perfil || [];
        console.log(`Perfil do usuário:`, perfilUsuario);

        const anunciosElegiveis: AnuncioDocument[] = [];

        // 3. Para cada anúncio, verificar localização e política
        console.log(`\n=== ANALISANDO ${todosAnuncios.length} ANÚNCIOS ===`);
        
        for (const anuncio of todosAnuncios) {
            console.log(`\n--- Analisando anúncio: ${anuncio.titulo} ---`);
            console.log(`ID: ${anuncio._id}`);

            const local = anuncio.local as any;
            
            if (!local) {
                console.log(`❌ Anúncio sem local - pulando`);
                continue;
            }

            console.log(`Tipo do local: ${local.tipo}`);
            console.log(`Nome do local: ${local.nome}`);

            // Verificar localização baseada no tipo
            let dentroDoLocal = false;

            if (local.tipo === 'GPS') {
                // Verificar distância para local GPS
                if (!localizacaoActualUsuario.latitude || !localizacaoActualUsuario.longitude) {
                    console.log(`❌ Sem coordenadas fornecidas - pulando`);
                    continue;
                }

                console.log(`Coordenadas local: lat=${local.latitude}, lon=${local.longitude}`);
                console.log(`Coordenadas usuário: lat=${localizacaoActualUsuario.latitude}, lon=${localizacaoActualUsuario.longitude}`);

                const distancia = this.calcularDistanciaEuclidiana(
                    localizacaoActualUsuario.latitude,
                    localizacaoActualUsuario.longitude,
                    local.latitude,
                    local.longitude
                );

                const raio = local.raio || 100;
                dentroDoLocal = distancia <= raio;

                console.log(`Distância calculada: ${distancia.toFixed(2)}m`);
                console.log(`Raio do local: ${raio}m`);
                console.log(`Está dentro do raio? ${dentroDoLocal ? '✅ SIM' : '❌ NÃO'}`);

            } else if (local.tipo === 'WIFI') {
                // Verificar SSIDs para local WiFi
                if (!localizacaoActualUsuario.ssids || localizacaoActualUsuario.ssids.length === 0) {
                    console.log(`❌ Sem SSIDs fornecidos - pulando`);
                    continue;
                }

                const sinaisLocal = local.sinal || [];
                console.log(`SSIDs do local:`, sinaisLocal);
                console.log(`SSIDs do cliente:`, localizacaoActualUsuario.ssids);

                dentroDoLocal = sinaisLocal.some(ssidLocal => 
                    localizacaoActualUsuario.ssids!.some(ssidCliente => 
                        this.compararSSIDs(ssidCliente, ssidLocal)
                    )
                );

                console.log(`Está na área WiFi? ${dentroDoLocal ? '✅ SIM' : '❌ NÃO'}`);
            } else {
                console.log(`⚠️ Tipo de local desconhecido: ${local.tipo} - pulando`);
                continue;
            }

            if (!dentroDoLocal) {
                console.log(`❌ Fora da área do local - pulando`);
                continue;
            }

            console.log(`✅ Está dentro da área do local`);

            // 4. Verificar política (whitelist/blacklist)
            console.log(`\nVerificando política...`);
            const satisfazPolitica = this.verificarPolitica(
                anuncio.listaChave,
                anuncio.politica,
                perfilUsuario
            );

            console.log(`Política do anúncio: ${anuncio.politica}`);
            console.log(`Satisfaz política? ${satisfazPolitica ? '✅ SIM' : '❌ NÃO'}`);

            if (!satisfazPolitica) {
                console.log(`❌ Não satisfaz política - pulando`);
                continue;
            }

            // Anúncio elegível!
            console.log(`🎉 ANÚNCIO ELEGÍVEL ENCONTRADO!`);
            anunciosElegiveis.push(anuncio);
        }

        console.log(`\n=== RESULTADO FINAL ===`);
        console.log(`Anúncios elegíveis encontrados: ${anunciosElegiveis.length}`);
        
        if (anunciosElegiveis.length > 0) {
            anunciosElegiveis.forEach((anuncio, index) => {
                console.log(`\nElegível ${index + 1}: ${anuncio.titulo}`);
            });
        }

        return anunciosElegiveis;

    } catch (error) {
        console.error('❌ Erro em anunciosProximos:', error);
        throw error;
    }
}
async testarAnunciosProximos() {
    // Dados de teste
    const testeDto:ReportarLocalizacaoDto = {
        latitude: -8.839,
        longitude: 13.289,
        ssids: ['ISPTEC_WIFI', 'Campus_Network'],
        username: 'pedro123'
    };

    console.log('=== INICIANDO TESTE ANUNCIOS PRÓXIMOS ===');
    console.log('Localização:', testeDto);
    
    try {
        const resultado = await this.anunciosProximos(testeDto, testeDto.username);
        console.log('=== RESULTADO DO TESTE ===');
        console.log(`Total anúncios encontrados: ${resultado.length}`);
        
        if (resultado.length > 0) {
            resultado.forEach((anuncio:any, index) => {
                console.log(`\nAnúncio ${index + 1}:`);
                console.log(`- Título: ${anuncio.titulo}`);
                console.log(`- Local: ${anuncio.local?.nome} (${anuncio.local?.tipo})`);
                console.log(`- Política: ${anuncio.politica}`);
                console.log(`- ListaChave: ${JSON.stringify(anuncio.listaChave)}`);
            });
        } else {
            console.log('Nenhum anúncio encontrado');
        }
        
        return resultado;
    } catch (error) {
        console.error('Erro no teste:', error);
        return [];
    }
}
/**
 * Comparar SSIDs de forma mais flexível
 */
private compararSSIDs(ssid1: string, ssid2: string): boolean {
    // Remover espaços e converter para minúsculas
    const s1 = ssid1.trim().toLowerCase();
    const s2 = ssid2.trim().toLowerCase();
    
    // Comparação exata
    if (s1 === s2) return true;
    
    // Verificar se um contém o outro (para casos como "Rede" vs "Rede_5G")
    if (s1.includes(s2) || s2.includes(s1)) return true;
    
    return false;
}

/**
 * Verificar se usuário satisfaz a política do anúncio
 */
private verificarPolitica(
    listaChave: any[],
    politica: string,
    perfilUsuario: any[]
): boolean {
    console.log(`=== VERIFICANDO POLÍTICA ===`);
    console.log(`Política: ${politica}`);
    console.log(`ListaChave: ${JSON.stringify(listaChave, null, 2)}`);
    console.log(`PerfilUsuario: ${JSON.stringify(perfilUsuario, null, 2)}`);

    // Se não há restrições
    if (!listaChave || listaChave.length === 0) {
        console.log('ListaChave vazia - sem restrições');
        // Blacklist vazia = todos podem ver
        // Whitelist vazia = ninguém pode ver
        const resultado = politica === 'blacklist';
        console.log(`Resultado para lista vazia: ${resultado}`);
        return resultado;
    }

    // Contar quantas restrições o usuário satisfaz
    let matches = 0;

    for (const restricao of listaChave) {
        // Obter nome da chave corretamente
        let nomeChave: string;
        
        // Caso 1: chaveId é um objeto populado com nome
        if (restricao.chaveId && typeof restricao.chaveId === 'object' && restricao.chaveId.nome) {
            nomeChave = restricao.chaveId.nome;
        } 
        // Caso 2: chaveId é um objeto com _id (não populado)
        else if (restricao.chaveId && typeof restricao.chaveId === 'object' && restricao.chaveId._id) {
            // Aqui você precisaria buscar o nome da chave pelo ID
            // Por enquanto, vamos usar o ID como nome
            nomeChave = restricao.chaveId._id.toString();
        }
        // Caso 3: chaveId é uma string
        else if (typeof restricao.chaveId === 'string') {
            nomeChave = restricao.chaveId;
        }
        // Caso 4: chave direta (fallback)
        else {
            nomeChave = restricao.chave || '';
        }

        const valorRequerido = restricao.valor || '';

        console.log(`\nAnalisando restrição:`);
        console.log(`- Chave requerida: "${nomeChave}"`);
        console.log(`- Valor requerido: "${valorRequerido}"`);

        // Procurar no perfil do usuário
        const perfilMatch = perfilUsuario.find(p => {
            const chavePerfil = (p.chave || '').toString().trim();
            const valorPerfil = (p.valor || '').toString().trim();
            
            console.log(`  Comparando com perfil: chave="${chavePerfil}", valor="${valorPerfil}"`);
            
            // Comparação case-insensitive
            const chaveMatch = chavePerfil.toLowerCase() === nomeChave.toLowerCase();
            const valorMatch = valorPerfil.toLowerCase() === valorRequerido.toLowerCase();
            
            console.log(`  Resultado: chaveMatch=${chaveMatch}, valorMatch=${valorMatch}`);
            
            return chaveMatch && valorMatch;
        });

        if (perfilMatch) {
            matches++;
            console.log(`✅ Match encontrado! Total matches: ${matches}`);
        } else {
            console.log(`❌ Não encontrou match para esta restrição`);
        }
    }

    console.log(`\n=== RESULTADO FINAL ===`);
    console.log(`Total restrições: ${listaChave.length}`);
    console.log(`Total matches: ${matches}`);

    // Whitelist: deve satisfazer TODAS as restrições
    if (politica === 'whitelist') {
        const resultado = matches === listaChave.length;
        console.log(`Whitelist: ${matches}/${listaChave.length} restrições satisfeitas`);
        console.log(`Resultado Whitelist: ${resultado ? 'APROVADO' : 'REPROVADO'}`);
        return resultado;
    }

    // Blacklist: NÃO deve satisfazer NENHUMA restrição
    if (politica === 'blacklist') {
        const resultado = matches === 0;
        console.log(`Blacklist: ${matches} restrições correspondentes (deve ser 0)`);
        console.log(`Resultado Blacklist: ${resultado ? 'APROVADO' : 'REPROVADO'}`);
        return resultado;
    }

    console.log(`⚠️ Política desconhecida: ${politica}`);
    return false;
}

    /**
     * Calcular distância Euclidiana entre dois pontos GPS (em metros)
     */
    private calcularDistanciaEuclidiana(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number,
    ): number {
        const METERS_PER_DEGREE_LAT = 111320;
        const avgLat = (lat1 + lat2) / 2;
        const metersPerDegreeLon = METERS_PER_DEGREE_LAT * Math.cos(avgLat * Math.PI / 180);

        const deltaX = (lat2 - lat1) * METERS_PER_DEGREE_LAT;
        const deltaY = (lon2 - lon1) * metersPerDegreeLon;

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    /**
     * Verificar se usuário satisfaz a política do anúncio
     * 
     * Comparação:
     * - anuncio.listaChave[i].chaveId.nome === perfilUsuario[j].chave
     * - anuncio.listaChave[i].valor === perfilUsuario[j].valor
     * 
     * Whitelist: Usuário DEVE ter TODOS os pares chave-valor
     * Blacklist: Usuário NÃO deve ter NENHUM dos pares chave-valor
     */
  
}