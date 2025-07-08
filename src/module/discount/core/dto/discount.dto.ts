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
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  percentage: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  maxDiscountAmount: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  usageLimit: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  perUserLimit: number;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;
}

export class UpdateDiscountDTO {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  percentage: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  maxDiscountAmount: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  usageLimit: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  perUserLimit: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate: Date;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}

export class SearchDiscountDTO {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  percentageFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  percentageTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  maxDiscountAmountFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  maxDiscountAmountTo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  usageLimitFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  usageLimitTo?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDateFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDateTo?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDateFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDateTo?: Date;
}
