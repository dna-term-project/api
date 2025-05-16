import { INestiaConfig } from '@nestia/sdk';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';

const NESTIA_CONFIG: INestiaConfig = {
  input: async () => await NestFactory.create(AppModule),
  output: 'packages/api',
  clone: true,
  distribute: 'packages/api',
  simulate: true,
  swagger: {
    output: 'swagger.json',
  },
};
export default NESTIA_CONFIG;
