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
import { IImage } from 'src/domain';

export class CreateImageDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  categoryId: string;

  @IsArray()
  @ValidateNested({ each: true })
  images: IImage[];
}

export class UpdateImageDTO {
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

export class SearchImageDTO {
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
