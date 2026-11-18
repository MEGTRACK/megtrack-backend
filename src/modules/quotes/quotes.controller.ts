import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuotesService } from './quotes.service.js';
import type { Quote } from './schemas/quote.schema.js';

type CreateQuoteInput = Pick<
  Quote,
  'name' | 'email' | 'phone' | 'fromCity' | 'toCity' | 'weight'
> &
  Partial<Pick<Quote, 'serviceType' | 'status'>>;

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() data: CreateQuoteInput) {
    return this.quotesService.create(data);
  }

  @Get()
  findAll() {
    return this.quotesService.findAll();
  }
}
