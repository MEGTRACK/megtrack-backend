import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }), // Enable Fastify logger
  );

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Enable CORS for your Vercel frontend
  app.enableCors({
    origin: ['http://localhost:3000', 'https://megtrack-au.vercel.app'],
    credentials: true,
  });

  // Important for Render: listen on 0.0.0.0
  const port = process.env.PORT ?? 4000;
  await app.listen(port, '0.0.0.0');

  Logger.log(`🚀 MEGTRACK Fastify API running on port ${port}`, 'Bootstrap');
}
void bootstrap().catch((error: unknown) => {
  Logger.error(
    'Application failed to start',
    error instanceof Error ? error.stack : String(error),
    'Bootstrap',
  );
  process.exitCode = 1;
});
