import { IRepository } from 'vtonomy';

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  categoryId: string;
  brandId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductPersistant {}

export interface IProductRepository
  extends IRepository<IProduct, IProductPersistant> {}
