import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { createCacheOptions } from './cache-options.js';
import { QuotesModule } from './modules/quotes/quotes.module.js';
import { TrackingModule } from './modules/tracking/tracking.module.js';
import { EstimatesModule } from './modules/estimates/estimates.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 1. MongoDB Connection
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        process.env.MONGO_URI ||
        'mongodb://localhost:27017/megtrack',
    ),

    // 2. Redis Cache Connection
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: createCacheOptions,
    }),

    // 3. Feature Modules
    QuotesModule,
    TrackingModule,
    EstimatesModule,
  ],
})
export class AppModule {}
