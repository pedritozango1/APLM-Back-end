import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChaveDocument = Chave & Document;

@Schema({ timestamps: true })
export class Chave {

  @Prop({ required: true })
  nome: string;
}

export const ChaveSchema = SchemaFactory.createForClass(Chave);

