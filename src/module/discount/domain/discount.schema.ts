import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class DiscountMongo {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  maxDiscountAmount: number;

  @Prop({ required: true })
  usageLimit: number;

  @Prop({ required: true })
  perUserLimit: number;

  @Prop({ required: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type DiscountMongoDocument = DiscountMongo & Document;
export const DiscountSchema = SchemaFactory.createForClass(DiscountMongo);

@Schema({ timestamps: true })
export class ProductDiscountMongo {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop()
  productId: string;

  @Prop()
  discountId: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ProductDiscountMongoDocument = ProductDiscountMongo & Document;
export const ProductDiscountSchema =
  SchemaFactory.createForClass(ProductDiscountMongo);
