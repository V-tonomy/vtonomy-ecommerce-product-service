import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested
} from 'class-validator';

import { Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { IImage } from 'src/domain';

export class CreateProductDTO {
  @ApiProperty({ example: 'Product 01', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'Description for product',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: 10000, description: 'Product price' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    example: 'category-id-123',
    description: 'Category of product',
  })
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: [
      {
        id: 'image-id-1',
        url: 'image-url',
        alt: 'alt',
      } as IImage,
    ],
    description: 'Images of product',
  })
  @IsArray()
  @IsOptional()
  images: any[];
}

export class UpdateProductDTO {
  @ApiProperty({ example: 'Product 01', description: 'Product name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'Description for product',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 10000, description: 'Product price' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiProperty({
    example: 'category-id-123',
    description: 'Category of product',
  })
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    example: [
      {
        id: 'image-id-1',
        url: 'image-url',
        alt: 'alt',
      } as IImage,
    ],
    description: 'Images of product',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  images?: IImage[];

  @ApiProperty({
    example: new Date(),
    description: 'Updated at',
  })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}
