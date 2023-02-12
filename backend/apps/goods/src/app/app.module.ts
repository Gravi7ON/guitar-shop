import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { ENV_FILE_PATH } from './app.constant';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ProductModule,
    PrismaModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtConfig, rabbitMqOptions],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    CommentModule,
    OrderModule,
    OrderProductModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
