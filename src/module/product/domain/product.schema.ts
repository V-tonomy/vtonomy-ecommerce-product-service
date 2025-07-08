import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IImage } from 'src/domain';

@Schema({ timestamps: true })
export class ProductMongo {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  categoryId: string;

  @Prop({
    type: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    required: true,
  })
  images: IImage[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ProductMongoDocument = ProductMongo & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductMongo);
