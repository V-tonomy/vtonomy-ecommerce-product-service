import {
  CreateDiscountHandler,
  DeleteDiscountByIdHandler,
  UpdateDiscountByIdHandler,
} from './handler';

export const DISCOUNT_HANDLER = [
  CreateDiscountHandler,
  UpdateDiscountByIdHandler,
  DeleteDiscountByIdHandler,
];
