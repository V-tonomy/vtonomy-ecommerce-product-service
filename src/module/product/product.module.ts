import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from 'vtonomy';
import { PRODUCT_HANDLER } from './core';
import { ProductSchema } from './domain/product.schema';
import { ProductRepository } from './infas/product.repository';
import { ProductController } from './infas/product.transport';

@Module({
  controllers: [ProductController],
  imports: [
    CqrsModule,
    RabbitmqModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    ...PRODUCT_HANDLER,
  ],
})
export class ProductModule {}
