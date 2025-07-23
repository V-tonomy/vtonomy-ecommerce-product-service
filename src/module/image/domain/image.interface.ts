import { IRepository } from 'vtonomy';

export interface IImage {
  id: string;
  productId: string;
  // skuId: string;
  // type: string;
  url: string;
  alt: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IImagePersistant {}

export interface IImageRepository
  extends IRepository<IImage, IImagePersistant> {}
