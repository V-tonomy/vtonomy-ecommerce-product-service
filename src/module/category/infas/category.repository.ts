import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'vtonomy';
import { Category, CategoryMongoDocument } from '../domain';

@Injectable()
export class CategoryRepository extends MongoRepository<
  Category,
  CategoryMongoDocument
> {
  constructor(
    @InjectModel('Category')
    model: Model<CategoryMongoDocument>,
  ) {
    super(model);
  }

  toDomain(doc: CategoryMongoDocument): Category {
    return new Category(
      doc._id.toString(),
      doc.name,
      doc.description,
      doc.parentCategoryId,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  fromDomain(domain: Category): CategoryMongoDocument {
    return new this.model({
      _id: domain.id,
      name: domain.name,
      description: domain.description,
      parentCategoryId: domain.parentCategoryId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
