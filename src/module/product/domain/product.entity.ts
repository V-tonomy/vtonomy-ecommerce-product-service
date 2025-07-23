import { IImage } from 'src/domain';

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public description: string,
    public price: number,
    public categoryId: string,
    public brandId: string,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
