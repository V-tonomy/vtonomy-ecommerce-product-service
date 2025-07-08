import { IRepository } from 'vtonomy';

export interface IDiscount {
  id: string;
  code: string;
  percentage: number;
  maxDiscountAmount: number;
  usageLimit: number;
  perUserLimit: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductDiscount {
  id: string;
  productId: string;
  discountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiscountPersistant {}
export interface IProductDiscountPersistant {}

export interface IDiscountRepository
  extends IRepository<IDiscount, IDiscountPersistant> {}
export interface IProductDiscountRepository
  extends IRepository<IProductDiscount, IProductDiscountPersistant> {}
