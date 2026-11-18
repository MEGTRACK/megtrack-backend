import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { QuotesModule } from './modules/quotes/quotes.module.js';
import { TrackingModule } from './modules/tracking/tracking.module.js';
import { EstimatesModule } from './modules/estimates/estimates.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 1. MongoDB Connection
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/megtrack',
    ),

    // 2. Redis Cache Connection
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        if (process.env.REDIS_URL) {
          return {
            store: await redisStore({
              url: process.env.REDIS_URL,
              ttl: 60,
            }),
          };
        }

        if (process.env.REDIS_HOST) {
          return {
            store: await redisStore({
              socket: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT || 6379),
              },
              ttl: 60,
            }),
          };
        }

        return {};
      },
    }),

    // 3. Feature Modules
    QuotesModule,
    TrackingModule,
    EstimatesModule,
  ],
})
export class AppModule {}
