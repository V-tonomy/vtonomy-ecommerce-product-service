import { IRepository } from "vtonomy";

export interface IImage {
  id: string;
  url: string;
  alt: string;
}

export interface IImagePersistant {}

export interface IImageRepository
  extends IRepository<IImage, IImagePersistant> {}
