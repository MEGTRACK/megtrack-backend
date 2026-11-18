import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TrackingService } from './tracking.service.js';
import type { Shipment } from './schemas/shipment.schema.js';
import type { ShipmentEvent } from './schemas/shipment.schema.js';

type CreateShipmentInput = Pick<Shipment, 'trackingNumber'> &
  Partial<Pick<Shipment, 'status' | 'events'>>;

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  create(@Body() data: CreateShipmentInput) {
    return this.trackingService.create(data);
  }

  @Get(':trackingNumber')
  findByTrackingNumber(@Param('trackingNumber') trackingNumber: string) {
    return this.trackingService.findByTrackingNumber(trackingNumber);
  }

  @Post(':trackingNumber/events')
  addEvent(
    @Param('trackingNumber') trackingNumber: string,
    @Body() event: ShipmentEvent,
  ) {
    return this.trackingService.addEvent(trackingNumber, event);
  }
}
