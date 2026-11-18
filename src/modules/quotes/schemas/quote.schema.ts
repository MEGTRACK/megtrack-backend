import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema({ timestamps: true })
export class Quote {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  fromCity: string;

  @Prop({ required: true })
  toCity: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ default: 'courier' })
  serviceType: string;

  @Prop({ default: 'pending' })
  status: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
