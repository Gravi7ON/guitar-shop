import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [ProductModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
