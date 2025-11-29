import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Perfil, PerfilSchema } from './perfil.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [PerfilSchema], default: [] ,required:false})
  perfil?: Perfil[];
}

export const UserSchema=SchemaFactory.createForClass(User);