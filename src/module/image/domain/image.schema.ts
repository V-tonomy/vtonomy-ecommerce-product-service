import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ImageMongo {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type ImageMongoDocument = ImageMongo & Document;
export const ImageSchema = SchemaFactory.createForClass(ImageMongo);
