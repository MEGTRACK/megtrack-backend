import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Quote, QuoteDocument } from './schemas/quote.schema';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name) private quoteModel: Model<QuoteDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(data: any): Promise<Quote> {
    const createdQuote = new this.quoteModel(data);
    return createdQuote.save();
  }

  async findAll(): Promise<Quote[]> {
    // 1. Check Redis first
    const cached = await this.cacheManager.get<Quote[]>('all_quotes');
    if (cached) return cached;

    // 2. If not in Redis, get from MongoDB
    const quotes = await this.quoteModel.find().exec();

    // 3. Save to Redis for next time (60s TTL)
    await this.cacheManager.set('all_quotes', quotes, 60000);
    
    return quotes;
  }
}