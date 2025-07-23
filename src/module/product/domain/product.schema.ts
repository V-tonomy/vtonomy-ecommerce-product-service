import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IImage } from 'src/domain';

@Schema({ timestamps: true })
export class ProductMongo {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  categoryId: string;

  @Prop()
  brandId: string;

  // @Prop({
  //   type: [
  //     {
  //       url: { type: String, required: true },
  //       alt: { type: String },
  //     },
  //   ],
  //   required: true,
  // })
  // images: IImage[];

  @Prop({ required: true })
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ProductMongoDocument = ProductMongo & Document;
export const ProductSchema = SchemaFactory.createForClass(ProductMongo);
