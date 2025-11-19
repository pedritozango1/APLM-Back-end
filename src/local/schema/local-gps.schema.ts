import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Local } from './local.schema';

@Schema()
export class LocalGPS extends Local {
  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop()
  raio: number;
}

export const LocalGPSSchema = SchemaFactory.createForClass(LocalGPS);
