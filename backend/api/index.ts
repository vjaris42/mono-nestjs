import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function createApp(): Promise<INestApplication> {
  if (!app) {
    app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: [
        'http://localhost:3000',
        'http://localhost:3002',
        'http://localhost:3003',
        // Add your Vercel URLs here after deployment
        'https://your-admin-app.vercel.app',
        'https://your-user-app.vercel.app',
        'https://your-analytics-app.vercel.app',
      ],
      credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await createApp();
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}
