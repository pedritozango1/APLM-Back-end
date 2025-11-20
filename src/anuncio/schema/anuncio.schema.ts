import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnuncioDocument = Anuncio & Document;

@Schema({ timestamps: true })
export class Anuncio {
  @Prop({ required: true, trim: true, maxlength: 200 })
  titulo: string;

  @Prop({ required: true, trim: true, maxlength: 1000 })
  mensagem: string;

  @Prop({ required: true, trim: true })
  local: string;

  @Prop({ 
    required: true, 
    enum: ['centralizado', 'descentralizado'],
    default: 'centralizado'
  })
  modoEntrega: string;

  @Prop({ 
    required: true, 
    enum: ['whitelist', 'blacklist'],
    default: 'blacklist'
  })
  politica: string;

  @Prop({ required: true, type: Date })
  inicio: Date;

  @Prop({ required: true, type: Date })
  fim: Date;
}

export const AnuncioSchema = SchemaFactory.createForClass(Anuncio);

// Validação customizada: início deve ser antes do fim
AnuncioSchema.pre('save', function(next) {
  if (this.inicio >= this.fim) {
    next(new Error('A data de início deve ser anterior à data de fim'));
  } else {
    next();
  }
});