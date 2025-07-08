import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @IsString()
  description: string;

  @IsString()
  
  parentCategoryId: string;
}

export class UpdateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @IsString()
  description: string;

  @IsString()
  parentCategoryId: string;
}
