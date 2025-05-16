import packageJson from '@/../package.json';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import initSwagger from './common/configs/swagger';
import { GlobalExceptionFilter } from './common/filters/global-exection.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('bootstrap');
  const isProduction = configService.get('NODE_ENV') === 'production';

  app.enableCors({
    origin:  ['http://localhost:3000'],
    methods: [
      'GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS',
    ],
    credentials: true,
  });

  app.useGlobalFilters(new GlobalExceptionFilter);

  await initSwagger(app);

  await app.listen(process.env.PORT ?? 8001, '0.0.0.0');

  logger.log(`Application version ${packageJson.version} is running on: ${await app.getUrl()}`);

  logger.debug(`Environment: ${isProduction ? 'production' : 'development'}`);
}
bootstrap();
