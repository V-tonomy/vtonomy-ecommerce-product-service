import { ICommand } from '@nestjs/cqrs';
import { CreateDiscountDTO } from '../dto/discount.dto';

export class CreateDiscountCommand implements ICommand {
  props: CreateDiscountDTO;

  constructor(props: CreateDiscountDTO) {
    this.props = props;
  }

  static create(data: CreateDiscountDTO) {
    return new CreateDiscountCommand(data);
  }
}
