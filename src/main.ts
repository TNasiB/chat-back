import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: ['http://localhost:5173'] },
  });
  app.useWebSocketAdapter(new WsAdapter(app));
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
