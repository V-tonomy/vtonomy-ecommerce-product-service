import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'vtonomy';
import { ProductDiscount } from '../domain/discount.entity';
import { ProductDiscountMongoDocument } from '../domain/discount.schema';

@Injectable()
export class ProductDiscountRepository extends MongoRepository<
  ProductDiscount,
  ProductDiscountMongoDocument
> {
  constructor(
    @InjectModel('ProductDiscount')
    model: Model<ProductDiscountMongoDocument>,
  ) {
    super(model);
  }

  toDomain(doc: ProductDiscountMongoDocument): ProductDiscount {
    return new ProductDiscount(
      doc._id,
      doc.productId,
      doc.discountId,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  fromDomain(domain: ProductDiscount): ProductDiscountMongoDocument {
    return new this.model({
      _id: domain.id,
      productId: domain.productId,
      discountId: domain.discountId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
