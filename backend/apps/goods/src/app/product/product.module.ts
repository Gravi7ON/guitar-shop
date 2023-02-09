import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { AdminGuard } from './guards/admin.guard';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    CommentModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductRepository, JwtStrategy, ProductService, AdminGuard],
  exports: [ProductRepository],
})
export class ProductModule {}
