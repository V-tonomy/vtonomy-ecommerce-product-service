import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @ApiProperty({ example: 'Category 01', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'Description for category',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'parent-category-id',
    description: 'Parent category',
  })
  @IsString()
  parentCategoryId: string;
}

export class UpdateCategoryDTO {
  @ApiProperty({ example: 'Category 01', description: 'Category name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name?: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'Description for category',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'parent-category-id',
    description: 'Parent category',
  })
  @IsString()
  parentCategoryId?: string;
}
