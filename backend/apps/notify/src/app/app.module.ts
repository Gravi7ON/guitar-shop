import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mailOptions } from '../config/mail.config';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [rabbitMqOptions, mongoDbOptions, mailOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
