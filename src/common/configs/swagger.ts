import { INestiaConfig, NestiaSwaggerComposer } from '@nestia/sdk';
import { type INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default async function initSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const logger = new Logger('SwaggerConfig');
  const isProduction = configService.get('NODE_ENV') === 'production';

  if (isProduction) {
    logger.warn('Swagger is disabled in production environment');

    return;
  }

  const { SwaggerModule } = await import('@nestjs/swagger');
  const { SwaggerTheme, SwaggerThemeNameEnum } = await import('swagger-themes');
  const theme = new SwaggerTheme;

  const config: Omit<INestiaConfig.ISwaggerConfig, "output"> =  {
    openapi: '3.1',
    beautify: true,
    servers: [
      {
        url: 'http://localhost:8001',
        description: 'Local Server',
      },
    ],
    
  };

  const document = await NestiaSwaggerComposer.document(app, config);

  SwaggerModule.setup('docs', app, document as any, {
      explorer:        true,
      customCss:       theme.getBuffer(SwaggerThemeNameEnum.NORD_DARK),
      customSiteTitle: 'DNA Term Project API Swagger',
    }
  );

  logger.log('Swagger initialized successfully');
}