import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class ImageDTO {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  url: string;
}

export class CreateImageDTO {
  @ApiProperty({
    description: 'List of uploaded image URLs',
    type: [ImageDTO],
    example: [{ url: 'https://example.com/image.jpg' }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDTO)
  @IsNotEmpty()
  files: ImageDTO[];
}
