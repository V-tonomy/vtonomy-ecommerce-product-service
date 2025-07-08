import { IImage } from 'src/domain';
import { IRepository } from 'vtonomy/dist/interface';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: IImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductPersistant {}

export interface IProductRepository
  extends IRepository<IProduct, IProductPersistant> {}
