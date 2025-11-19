import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocalDocument = Local & Document;

@Schema({ discriminatorKey: 'tipo', timestamps: true })
export class Local {
  @Prop({ required: true })
  nome: string;
}

export const LocalSchema = SchemaFactory.createForClass(Local);
