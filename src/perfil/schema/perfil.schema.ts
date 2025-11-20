import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PerfilDocument = Perfil & Document;

@Schema({ timestamps: true })
export class Perfil {
  @Prop({ required: true })
  valor: string;

  @Prop({ required: true })
  chave: string;
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);
