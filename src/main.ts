import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import { TransformInterceptor } from './transform.interceptor';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asdfasdf'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);

  logger.log(`Application running on port ${port}`);
}
bootstrap();
