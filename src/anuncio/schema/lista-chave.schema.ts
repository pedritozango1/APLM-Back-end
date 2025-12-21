import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Chave } from "src/chave/schema/chave.schema";

export type ListaChaveDocument = HydratedDocument<ListaChave>;

@Schema({ collection: 'lista_chaves', _id: false })
export class ListaChave {

  @Prop({ type: Types.ObjectId,ref:Chave.name, required: true })
  chaveId: Types.ObjectId;

  @Prop({ required: true })
  valor: string;
}

export const ListaChaveSchema = SchemaFactory.createForClass(ListaChave);
