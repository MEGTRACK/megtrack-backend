import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShipmentDocument = HydratedDocument<Shipment>;

@Schema({ timestamps: true })
export class Shipment {
  @Prop({ required: true, unique: true })
  trackingNumber: string;

  @Prop({ default: 'created' })
  status: string;

  @Prop({ type: Array, default: [] })
  events: { time: string; location: string; description: string }[];
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);