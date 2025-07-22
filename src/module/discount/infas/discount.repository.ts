import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'vtonomy';
import { Discount } from '../domain/discount.entity';
import { DiscountMongoDocument } from '../domain/discount.schema';

@Injectable()
export class DiscountRepository extends MongoRepository<
  Discount,
  DiscountMongoDocument
> {
  constructor(
    @InjectModel('Discount')
    model: Model<DiscountMongoDocument>,
  ) {
    super(model);
  }

  toDomain(doc: DiscountMongoDocument): Discount {
    return new Discount(
      doc._id,
      doc.code,
      doc.percentage,
      doc.maxDiscountAmount,
      doc.usageLimit,
      doc.perUserLimit,
      doc.startDate,
      doc.endDate,
      doc.isActive,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  fromDomain(domain: Discount): DiscountMongoDocument {
    return new this.model({
      _id: domain.id,
      code: domain.code,
      percentage: domain.percentage,
      maxDiscountAmount: domain.maxDiscountAmount,
      usageLimit: domain.usageLimit,
      perUserLimit: domain.perUserLimit,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
