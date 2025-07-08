import { IRepository } from 'vtonomy/dist/interface';

export interface ICategory {
  id: string;
  name: string;
  description: string;
  parentCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryPersistant {}

export interface ICategoryRepository
  extends IRepository<ICategory, ICategoryPersistant> {}
