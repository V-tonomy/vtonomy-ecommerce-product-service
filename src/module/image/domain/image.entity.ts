import { IImage } from 'src/domain';

export class Image implements IImage {
  constructor({
    id,
    productId,
    url,
    alt,
    sortOrder,
    createdAt,
    updatedAt,
  }: {
    id: string;
    productId: string;
    url: string;
    alt: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.productId = productId;
    this.url = url;
    this.alt = alt;
    this.sortOrder = sortOrder;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public readonly id: string;
  public readonly productId: string;
  // public readonly skuId: string;
  // public readonly type: string;
  public readonly url: string;
  public readonly alt: string;
  public readonly sortOrder: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}
