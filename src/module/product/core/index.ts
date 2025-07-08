import {
  CreateProductHandler,
  DeleteProductByIdHandler,
  UpdateProductByIdHandler,
} from './handler';

export const PRODUCT_HANDLER = [
  CreateProductHandler,
  UpdateProductByIdHandler,
  DeleteProductByIdHandler,
];
