import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS, CoreModule } from 'vtonomy';
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
    CoreModule,
    MongooseModule.forRoot(process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce'),
    MongooseModule.forFeature([
      { name: 'Discount', schema: DiscountSchema },
      { name: 'ProductDiscountMongo', schema: ProductDiscountSchema },
    ]),
    ClientsModule.register([
      {
        name: CLIENTS.Search_Client,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672'],
          queue: 'search_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
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
