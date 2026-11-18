import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import type { Model } from 'mongoose';
import { Quote } from './schemas/quote.schema.js';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name) private readonly quoteModel: Model<Quote>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(
    data: Pick<
      Quote,
      'name' | 'email' | 'phone' | 'fromCity' | 'toCity' | 'weight'
    > &
      Partial<Pick<Quote, 'serviceType' | 'status'>>,
  ): Promise<Quote> {
    const createdQuote = new this.quoteModel(data);
    const quote = await createdQuote.save();
    await this.cacheManager.del('all_quotes');
    return quote;
  }

  async findAll(): Promise<Quote[]> {
    const cached = await this.cacheManager.get<Quote[]>('all_quotes');
    if (cached) return cached;

    const quotes = await this.quoteModel.find().exec();
    await this.cacheManager.set('all_quotes', quotes, 60000);
    return quotes;
  }
}
