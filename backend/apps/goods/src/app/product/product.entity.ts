import { AmountOfString, Comment } from '@backend/shared-types';
import { Entity } from '@backend/core';
import { Product } from '@backend/shared-types';

export class ProductEntity implements Entity<ProductEntity>, Product {
  public id?: number;
  public title: string;
  public description: string;
  public cost: number;
  public image: string;
  public productType: string;
  public amountOfReview: number;
  public amountOfString: AmountOfString;
  public vendorCode: string;
  public rating: number;
  public createdAt: Date;
  public comments?: Comment[];

  constructor(task: Product) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Product) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.cost = entity.cost;
    this.image = entity.image;
    this.productType = entity.productType;
    this.amountOfReview = entity.amountOfReview;
    this.amountOfString = entity.amountOfString;
    this.vendorCode = entity.vendorCode;
    this.rating = entity.rating;
    this.createdAt = entity.createdAt;
    this.comments = [];
  }

  public toObject(): ProductEntity {
    return {
      ...this
    };
  }
}
