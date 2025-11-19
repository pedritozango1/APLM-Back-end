import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Local } from './local.schema';

@Schema()
export class LocalWifi extends Local {
  @Prop({ type: [String], required: true })
  sinal: string[];
}

export const LocalWifiSchema = SchemaFactory.createForClass(LocalWifi);
