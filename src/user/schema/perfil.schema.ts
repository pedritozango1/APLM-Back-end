import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PerfilDocument = Perfil & Document;

@Schema({ timestamps: true })
export class Perfil {
  @Prop({ required: true })
  chave: string;     // ex: "club"

  @Prop({ required: true })
  valor: string;     // ex: "Real Madrid"
}

export const PerfilSchema = SchemaFactory.createForClass(Perfil);