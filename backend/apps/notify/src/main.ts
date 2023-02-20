/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { NestFactory } from '@nestjs/core';
import { DEFAULT_PORT } from '@backend/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { getRabbitMqConfig, getRabbitMqOrderQueueConfig } from './config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('USERS_SERVICE', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('USERS_SERVICE', {
              colors: true,
              prettyPrint: true,
            }),
          )
        })
      ]
    }),
  });

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));
  app.connectMicroservice(getRabbitMqOrderQueueConfig(configService));

  await app.startAllMicroservices();
  Logger.log(`🚀 Notify service is running on`);

  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
