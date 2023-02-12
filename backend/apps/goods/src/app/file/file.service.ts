import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from '../product/dto/update-product.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class FileService {
  constructor(
    private readonly productService: ProductService
  ) {}

  async updateImagePath(productId: number, dto: Pick<UpdateProductDto, 'image'>) {
    return this.productService.updateProduct(productId, dto);
  }
}
