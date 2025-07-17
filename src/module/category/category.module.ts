import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS } from 'vtonomy';
import { CATEGORY_HANDLER } from './core';
import { CategorySchema } from './domain/category.schema';
import { CategoryRepository } from './infas/category.repository';
import { CategoryController } from './infas/category.transport';

@Module({
  controllers: [CategoryController],
  imports: [
    CqrsModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
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
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
    ...CATEGORY_HANDLER,
  ],
})
export class CategoryModule {}
