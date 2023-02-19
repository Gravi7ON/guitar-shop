import { Injectable, Logger } from '@nestjs/common';
import { CRUDRepository } from '@backend/core';
import { PrismaService } from '../prisma/prisma.service';
import { ProductEntity } from './product.entity';
import { Product } from '@backend/shared-types';
import { Prisma } from '@prisma/client';
import { ProductMessageException } from './product.constant';
import { ProductQuery } from './queries/product.query';

@Injectable()
export class ProductRepository implements CRUDRepository<ProductEntity, number, Product> {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async create(item: ProductEntity): Promise<Product>  {
    const productEntity = item.toObject();
    return this.prisma.product.create({
      data: {
        ...productEntity,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id
        }
      });
    } catch(error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        Logger.log(
          ProductMessageException.NotFound
        );
      }
    }
  }

  public update(id: number, item: ProductEntity): Promise<Product> {
    const product = item.toObject();

    return this.prisma.product.update({
      where: {
        id
      },
      data: {
        ...product,
        comments: {
          connect: []
        }
      },
      include: {
        comments: true
      }
    });
  }

  public async findById(id: number): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: {
        id
      },
      include: {
        comments: true
      }
    });
  }

  public async findProducts({limit, page, sortDirection, sortField, amountOfString, productType}: ProductQuery): Promise<Product[] | null> {
    return this.prisma.product.findMany({
      where: productType ? {
        productType
      } :
      amountOfString ? {
        amountOfString
      } : undefined,
      take: limit,
      include: {
        comments: true
      },
      orderBy: sortField === 'cost' ? [
        {
          cost: sortDirection ?? undefined
        }
      ] : sortField === 'rating' ? [
        {
          rating: sortDirection ?? undefined
        },
      ] : [
        {
          createdAt: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }
}
