import { ShipmentSchema } from './shipment.schema.js';

describe('ShipmentSchema', () => {
  it('stores events as structured subdocuments', () => {
    expect(ShipmentSchema.path('events.0.time')).toBeDefined();
    expect(ShipmentSchema.path('events.0.location')).toBeDefined();
    expect(ShipmentSchema.path('events.0.description')).toBeDefined();
  });
});
