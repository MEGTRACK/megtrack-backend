import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Shipment } from './schemas/shipment.schema.js';
import type {
  ShipmentDocument,
  ShipmentEvent,
} from './schemas/shipment.schema.js';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(Shipment.name)
    private readonly shipmentModel: Model<ShipmentDocument>,
  ) {}

  async create(
    data: Pick<Shipment, 'trackingNumber'> &
      Partial<Pick<Shipment, 'status' | 'events'>>,
  ): Promise<ShipmentDocument> {
    return new this.shipmentModel(data).save();
  }

  async findByTrackingNumber(
    trackingNumber: string,
  ): Promise<ShipmentDocument> {
    const shipment = await this.shipmentModel
      .findOne({ trackingNumber })
      .exec();
    if (!shipment) {
      throw new NotFoundException(
        `Shipment with tracking number "${trackingNumber}" was not found`,
      );
    }

    return shipment;
  }

  async addEvent(
    trackingNumber: string,
    event: ShipmentEvent,
  ): Promise<ShipmentDocument> {
    const shipment = await this.findByTrackingNumber(trackingNumber);
    shipment.events.push(event);
    return shipment.save();
  }
}
