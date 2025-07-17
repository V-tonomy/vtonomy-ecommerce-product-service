import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS } from 'vtonomy';
import { PRODUCT_HANDLER } from './core';
import { ProductSchema } from './domain/product.schema';
import { ProductRepository } from './infas/product.repository';
import { ProductController } from './infas/product.transport';

@Module({
  controllers: [ProductController],
  imports: [
    CqrsModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ClientsModule.register([
      {
        name: CLIENTS.Search_Client,
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://vtonomy:123456@localhost:5672',
          ],
          queue: 'search_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
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
