import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class ShipmentEvent {
  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;
}

export const ShipmentEventSchema = SchemaFactory.createForClass(ShipmentEvent);

export type ShipmentDocument = HydratedDocument<Shipment>;

@Schema({ timestamps: true })
export class Shipment {
  @Prop({ required: true, unique: true })
  trackingNumber: string;

  @Prop({ default: 'created' })
  status: string;

  @Prop({ type: [ShipmentEventSchema], default: [] })
  events: ShipmentEvent[];
}

export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
