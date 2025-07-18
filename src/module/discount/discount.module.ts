import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from 'vtonomy';
import { DISCOUNT_HANDLER } from './core';
import {
  DiscountSchema,
  ProductDiscountSchema,
} from './domain/discount.schema';
import { DiscountRepository } from './infas/discount.repository';
import { DiscountController } from './infas/discount.transport';

@Module({
  controllers: [DiscountController],
  imports: [
    CqrsModule,
    RabbitmqModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([
      { name: 'Discount', schema: DiscountSchema },
      { name: 'ProductDiscountMongo', schema: ProductDiscountSchema },
    ]),
  ],
  providers: [
    {
      provide: 'IDiscountRepository',
      useClass: DiscountRepository,
    },
    ...DISCOUNT_HANDLER,
  ],
})
export class DiscountModule {}
