import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS, CoreModule } from 'vtonomy';
import { PRODUCT_HANDLER } from './core';
import { ProductSchema } from './domain/product.schema';
import { ProductRepository } from './infas/product.repository';
import { ProductController } from './infas/product.transport';

@Module({
  controllers: [ProductController],
  imports: [
    CoreModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    ClientsModule.register([
      {
        name: CLIENTS.Search_Client,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://vtonomy:123456@localhost:5672'],
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
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
    ...PRODUCT_HANDLER,
  ],
})
export class ProductModule {}
