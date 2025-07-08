import { Module } from '@nestjs/common';
import { CategoryModule } from './module/category/category.module';
import { DiscountModule } from './module/discount/discount.module';
import { ImageModule } from './module/image/image.module';
import { ProductModule } from './module/product/product.module';

@Module({
  controllers: [],
  imports: [CategoryModule, ProductModule, ImageModule, DiscountModule],
  providers: [],
})
export class AppModule {}
