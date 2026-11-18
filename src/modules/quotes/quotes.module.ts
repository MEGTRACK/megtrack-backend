import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesController } from './quotes.controller.js';
import { QuotesService } from './quotes.service.js';
import { Quote, QuoteSchema } from './schemas/quote.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
