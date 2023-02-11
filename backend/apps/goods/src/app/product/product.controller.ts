import { fillObject } from '@backend/core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from '../guards/admin.guard';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ProductService } from './product.service';
import { ProductQuery } from './queries/product.query';
import { ProductRdo } from './rdo/product.rdo';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/')
  async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productService.createProduct(dto);

    return fillObject(ProductRdo, newProduct);
  }

  @Get('/')
  async findProducts(@Query() query: ProductQuery) {
    const existedProducts = await this.productService.findProducts(query);

    return fillObject(ProductRdo, existedProducts);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('/:id')
  async update(@Body() dto: UpdateProductDto, @Param('id', ParseIntPipe) id: number) {
    const existedProduct = await this.productService.updateProduct(id, dto);

    return fillObject(ProductRdo, existedProduct);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);
  }

  @Get('/:id')
  async findProduct(@Param('id', ParseIntPipe) id: number) {
    const existedProduct = await this.productService.findProduct(id);

    return fillObject(ProductRdo, existedProduct);
  }
}
