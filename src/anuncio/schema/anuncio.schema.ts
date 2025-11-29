import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Chave } from 'src/chave/schema/chave.schema';
import { Local } from 'src/local/schema/local.schema';
import { User } from 'src/user/schema/user-schema';

export type AnuncioDocument = Anuncio & Document;

@Schema({ timestamps: true })
export class Anuncio {
  @Prop({ required: true, trim: true, maxlength: 200 })
  titulo: string;

  @Prop({ required: true, trim: true, maxlength: 1000 })
  mensagem: string;

  // Referência correta para Local
  @Prop({ type: Types.ObjectId, ref: 'Local', required: true })
  local: Types.ObjectId | Local;

  @Prop([{ type: Types.ObjectId, ref: Chave.name }])
  chave: Types.ObjectId[];

  // Referência correta para User (quem criou)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId | User;

  @Prop({
    required: true,
    enum: ['centralizado', 'descentralizado'],
    default: 'centralizado',
  })
  modoEntrega: string;

  @Prop({
    required: true,
    enum: ['whitelist', 'blacklist'],
    default: 'blacklist',
  })
  politica: string;

  @Prop({ required: true, type: Date })
  inicio: Date;

  @Prop({ required: true, type: Date })
  fim: Date;
}

export const AnuncioSchema = SchemaFactory.createForClass(Anuncio);

// Validação: início antes do fim
AnuncioSchema.pre('save', function (next) {
  if (this.inicio >= this.fim) {
    next(new Error('A data de início deve ser anterior à data de fim'));
  } else {
    next();
  }
});

