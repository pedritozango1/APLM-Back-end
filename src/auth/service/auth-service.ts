import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/user/service/user-service';
import { v4 as uuidv4 } from 'uuid';
import { Session, SessionDocument } from '../schema/sessao';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) { }

  async login(username: string, password: string) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) throw new Error('Credenciais inválidas');
    const sessionId = uuidv4();
    const sessao = new this.sessionModel({ user: user._id, sessionId, active: true });
    const sec= await sessao.save();
    const seccaoComUsario=await this.sessionModel.findById(sec._id).populate("user").exec();
    console.log("retornar:",seccaoComUsario);
    return seccaoComUsario;
    
  }
  async findIdSession(idSession: string): Promise<Session | null> {
    return this.sessionModel.findOne({ sessionId: idSession }).exec();
  }
  async logout(sessionId: string) {
    const session = await this.sessionModel.findOne({ sessionId });
    if (!session) throw new Error('Sessão não encontrada');
    session.active = false;
    await session.save();
    return { message: 'Sessão encerrada com sucesso' };
  }

  async validateSession(sessionId: string): Promise<boolean> {
    const session = await this.sessionModel.findOne({ sessionId, active: true });
    return !!session;
  }
}
