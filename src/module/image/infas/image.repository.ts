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
    return new Image(doc._id, doc.url, doc.createdAt, doc.updatedAt);
  }

  fromDomain(domain: Image): ImageMongoDocument {
    return new this.model({
      _id: domain.id,
      url: domain.url,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    });
  }
}
