import { IDiscount, IProductDiscount } from './discount.interface';

export class Discount implements IDiscount {
  constructor(
    public readonly id: string,
    public code: string,
    public percentage: number,
    public maxDiscountAmount: number,
    public usageLimit: number,
    public perUserLimit: number,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

export class ProductDiscount implements IProductDiscount{
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly discountId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
