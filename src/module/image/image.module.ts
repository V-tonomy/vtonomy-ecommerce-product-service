import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from 'vtonomy';
import { IMAGE_HANDLER } from './core';
import { ImageSchema } from './domain';
import { ImageRepository } from './infas/image.repository';
import { ImageController } from './infas/image.transport';

@Module({
  imports: [
    CqrsModule,
    RabbitmqModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  controllers: [ImageController],

  providers: [
    {
      provide: 'IImageRepository',
      useClass: ImageRepository,
    },
    ...IMAGE_HANDLER,
  ],
})
export class ImageModule {}
