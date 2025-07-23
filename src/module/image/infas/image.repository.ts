import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoRepository } from 'vtonomy';
import { Image } from '../domain/image.entity';
import { ImageMongoDocument } from '../domain/image.schema';

@Injectable()
export class ImageRepository extends MongoRepository<
  Image,
  ImageMongoDocument
> {
  constructor(
    @InjectModel('Image')
    model: Model<ImageMongoDocument>,
  ) {
    super(model);
  }

  toDomain(doc: ImageMongoDocument): Image {
    return new Image({
      id: doc._id,
      url: doc.url,
      alt: doc.alt,
      productId: doc.productId,
      sortOrder: doc.sortOrder,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  fromDomain(domain: Image): ImageMongoDocument {
    return new this.model({
      _id: domain.id,
      url: domain.url,
      alt: domain.alt,
      productId: domain.productId,
      sortOrder: domain.sortOrder,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
