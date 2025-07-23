import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'vtonomy';
import { Product } from '../domain/product.entity';
import { ProductMongoDocument } from '../domain/product.schema';

@Injectable()
export class ProductRepository extends MongoRepository<
  Product,
  ProductMongoDocument
> {
  constructor(
    @InjectModel('Product')
    model: Model<ProductMongoDocument>,
  ) {
    super(model);
  }

  toDomain(doc: ProductMongoDocument): Product {
    return new Product(
      doc._id,
      doc.name,
      doc.slug,
      doc.description,
      doc.price,
      doc.categoryId,
      doc.brandId,
      doc.status,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  fromDomain(domain: Product): ProductMongoDocument {
    return new this.model({
      _id: domain.id,
      name: domain.name,
      slug: domain.slug,
      description: domain.description,
      price: domain.price,
      categoryId: domain.categoryId,
      brandId: domain.brandId,
      status: domain.status,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
