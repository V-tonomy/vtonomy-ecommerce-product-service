import { ICommand } from '@nestjs/cqrs';
import { CreateProductDTO } from '../dto/product.dto';

export class CreateProductCommand implements ICommand {
  props: CreateProductDTO;

  constructor(props: CreateProductDTO) {
    this.props = props;
  }

  static create(data: CreateProductDTO) {
    return new CreateProductCommand(data);
  }
}
