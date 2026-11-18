import { Logger } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

export async function createCacheOptions() {
  if (process.env.REDIS_URL) {
    return {
      store: await redisStore({
        url: process.env.REDIS_URL,
        ttl: 60,
      }),
    };
  }

  const redisHost = process.env.REDIS_HOST?.trim();
  if (
    redisHost &&
    !['localhost', '127.0.0.1', '::1', '[::1]'].includes(
      redisHost.toLowerCase(),
    )
  ) {
    return {
      store: await redisStore({
        socket: {
          host: redisHost,
          port: Number(process.env.REDIS_PORT || 6379),
        },
        ttl: 60,
      }),
    };
  }

  if (redisHost) {
    Logger.warn(
      'REDIS_HOST points to localhost; using in-memory cache. Set REDIS_URL for managed Redis.',
      'AppModule',
    );
  }

  return {};
}
