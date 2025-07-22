import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateDiscountDTO {
  @ApiProperty({ example: 'DISCOUNTCODE', description: 'Discount code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 20, description: 'Discount percent' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  percentage: number;

  @ApiProperty({
    example: 100,
    description: 'Max discount percent',
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  maxDiscountAmount: number;

  @ApiProperty({ example: 10, description: 'Usage limit' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  usageLimit: number;

  @ApiProperty({ example: 19, description: 'Per User limit' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  perUserLimit: number;

  @ApiProperty({ example: new Date(), description: 'Start date' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ example: new Date(), description: 'End date' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}

export class UpdateDiscountDTO {
  @ApiProperty({ example: 20, description: 'Discount percent' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  percentage: number;

  @ApiProperty({
    example: 100,
    description: 'Max discount percent',
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  maxDiscountAmount: number;

  @ApiProperty({ example: 10, description: 'Usage limit' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  usageLimit: number;

  @ApiProperty({ example: 19, description: 'Per User limit' })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  perUserLimit: number;

  @ApiProperty({ example: new Date(), description: 'Start date' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate: Date;

  @ApiProperty({ example: new Date(), description: 'End date' })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate: Date;

  @ApiProperty({ example: true, description: 'Is active' })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

// export class SearchDiscountDTO {
//   @IsOptional()
//   @IsString()
//   code?: string;

//   @IsOptional()
//   @IsBoolean()
//   isActive?: boolean;

//   @IsOptional()
//   @Type(() => Number)
//   @IsPositive()
//   percentageFrom?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsPositive()
//   percentageTo?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsPositive()
//   maxDiscountAmountFrom?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsPositive()
//   maxDiscountAmountTo?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsPositive()
//   usageLimitFrom?: number;

//   @IsOptional()
//   @Type(() => Number)
//   @IsPositive()
//   usageLimitTo?: number;

//   @IsOptional()
//   @Type(() => Date)
//   @IsDate()
//   startDateFrom?: Date;

//   @IsOptional()
//   @Type(() => Date)
//   @IsDate()
//   startDateTo?: Date;

//   @IsOptional()
//   @Type(() => Date)
//   @IsDate()
//   endDateFrom?: Date;

//   @IsOptional()
//   @Type(() => Date)
//   @IsDate()
//   endDateTo?: Date;
// }
