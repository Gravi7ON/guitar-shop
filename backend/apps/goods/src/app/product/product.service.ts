import { Product } from '@backend/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductMessageException } from './product.constant';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductQuery } from './queries/product.query';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const productEntity = new ProductEntity(dto);

    return this.productRepository.create(productEntity);
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    const existedProduct = await this.productRepository.findById(id);

    if (!existedProduct) {
      throw new NotFoundException(ProductMessageException.NotFound);
    }

    const productEntity = new ProductEntity({...existedProduct, ...dto});

    return this.productRepository.update(id, productEntity)
  }

  async deleteProduct(id: number): Promise<void> {
    this.productRepository.destroy(id);
  }

  async findProduct(id: number): Promise<Product | null> {
    const existedProduct = await this.productRepository.findById(id);

    if (!existedProduct) {
      throw new NotFoundException(ProductMessageException.NotFound);
    }

    return existedProduct;
  }

  async findProducts(query: ProductQuery): Promise<Product[] | null> {
    const existedProducts = await this.productRepository.findProducts(query);

    if (existedProducts.length === 0) {
      throw new NotFoundException(ProductMessageException.NotFound);
    }

    return existedProducts;
  }
}
