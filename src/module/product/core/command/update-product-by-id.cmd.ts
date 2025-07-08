import { ICommand } from '@nestjs/cqrs';
import { UpdateProductDTO } from '../dto/product.dto';

export class UpdateProductByIdCommand implements ICommand {
  id: string;
  props: UpdateProductDTO;

  constructor(id: string, props: UpdateProductDTO) {
    this.id = id;
    this.props = props;
  }

  static create(id: string, data: UpdateProductDTO) {
    return new UpdateProductByIdCommand(id, data);
  }
}
