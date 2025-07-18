import { IImage } from 'src/domain';

export class Image implements IImage {
  constructor(
    public readonly id: string,
    public readonly url: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
