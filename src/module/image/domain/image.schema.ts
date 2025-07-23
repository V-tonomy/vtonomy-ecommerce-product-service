import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ImageMongo {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  productId: string;

  // @Prop({ required: true, type: String })
  // skuId: string;

  // @Prop({ required: true, type: String })
  // type: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  alt: string;

  @Prop({ required: true })
  sortOrder: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ImageMongoDocument = ImageMongo & Document;
export const ImageSchema = SchemaFactory.createForClass(ImageMongo);
