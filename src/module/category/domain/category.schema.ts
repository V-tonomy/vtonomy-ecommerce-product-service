import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class CategoryMongo {
    @Prop()
    _id: string;

    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    parentCategoryId: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export type CategoryMongoDocument = CategoryMongo & Document;
export const CategorySchema = SchemaFactory.createForClass(CategoryMongo);
