import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENTS, CoreModule } from 'vtonomy';
import { IMAGE_HANDLER } from './core';
import { ImageSchema } from './domain/image.schema';
import { ImageRepository } from './infas/image.repository';
import { ImageController } from './infas/image.transport';

@Module({
  controllers: [ImageController],
  imports: [
    CoreModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
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
    ImageRepository,
    {
      provide: 'IImageRepository',
      useClass: ImageRepository,
    },
    ...IMAGE_HANDLER,
  ],
})
export class ImageModule {}
