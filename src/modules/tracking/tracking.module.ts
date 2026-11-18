import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackingController } from './tracking.controller.js';
import { TrackingService } from './tracking.service.js';
import { Shipment, ShipmentSchema } from './schemas/shipment.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shipment.name, schema: ShipmentSchema },
    ]),
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
