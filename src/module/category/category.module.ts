import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from 'vtonomy';
import { CATEGORY_HANDLER } from './core';
import { CategorySchema } from './domain/category.schema';
import { CategoryRepository } from './infas/category.repository';
import { CategoryController } from './infas/category.transport';

@Module({
  controllers: [CategoryController],
  imports: [
    CqrsModule,
    RabbitmqModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/ecommerce',
    ),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
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
