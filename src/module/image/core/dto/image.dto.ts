import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class ImageFileDTO {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  url: string;

  @ApiProperty({ example: 'Side view of product' })
  @IsString()
  alt: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  sortOrder: number;
}

export class CreateImageDTO {
  @ApiProperty({ example: 'prod_67890' })
  @IsString()
  productId: string;

  @ApiProperty({ type: [ImageFileDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageFileDTO)
  files: ImageFileDTO[];
}
