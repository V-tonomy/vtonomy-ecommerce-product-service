import { ICommand } from '@nestjs/cqrs';
import { UpdateDiscountDTO } from '../dto/discount.dto';

export class UpdateDiscountByIdCommand implements ICommand {
  id: string;
  props: UpdateDiscountDTO;

  constructor(id: string, props: UpdateDiscountDTO) {
    this.id = id;
    this.props = props;
  }

  static create(id: string, data: UpdateDiscountDTO) {
    return new UpdateDiscountByIdCommand(id, data);
  }
}
