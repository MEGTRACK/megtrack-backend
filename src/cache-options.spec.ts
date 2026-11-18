import { Logger } from '@nestjs/common';
import { vi } from 'vitest';
import { createCacheOptions } from './cache-options.js';

describe('createCacheOptions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('uses in-memory caching when REDIS_HOST points to localhost', async () => {
    vi.stubEnv('REDIS_URL', '');
    vi.stubEnv('REDIS_HOST', 'localhost');
    vi.spyOn(Logger, 'warn').mockImplementation(() => {});

    await expect(createCacheOptions()).resolves.toEqual({});
  });
});
