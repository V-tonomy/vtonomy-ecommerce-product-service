import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS } from 'vtonomy';
import { IMAGE_HANDLER } from './core';
import { ImageSchema } from './domain/image.schema';
import { ImageRepository } from './infas/image.repository';
import { ImageController } from './infas/image.transport';

@Module({
  controllers: [ImageController],
  imports: [
    CqrsModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
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
    ImageRepository,
    {
      provide: 'IImageRepository',
      useClass: ImageRepository,
    },
    ...IMAGE_HANDLER,
  ],
})
export class ImageModule {}
