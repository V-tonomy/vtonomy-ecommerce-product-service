import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { IImage } from 'src/domain';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsString()
  categoryId: string;

  @IsArray()
  @IsOptional()
  images: any[];
}

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsOptional()
  categoryId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  images?: IImage[];

  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}

export class SearchProductDTO {
  @IsString()
  @IsOptional()
  keyword?: string;

  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  maxPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit?: number;
}
