import { ICategory } from './category.interface';

export class Category implements ICategory {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly parentCategoryId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
