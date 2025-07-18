import { IRepository } from 'vtonomy';

export interface IImage {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IImagePersistant {}

export interface IImageRepository
  extends IRepository<IImage, IImagePersistant> {}
