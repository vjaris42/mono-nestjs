import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend applications
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(
    `Backend API running on http://localhost:${process.env.PORT ?? 3001}`,
  );
}

void bootstrap();
