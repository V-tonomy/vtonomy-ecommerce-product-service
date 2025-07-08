import { ICommand } from '@nestjs/cqrs';
import { UpdateCategoryDTO } from '../dto/category.dto';

export class UpdateCategoryByIdCommand implements ICommand {
  id: string;
  props: UpdateCategoryDTO;

  constructor(id: string, props: UpdateCategoryDTO) {
    this.id = id;
    this.props = props;
  }

  static create(id: string, data: UpdateCategoryDTO) {
    return new UpdateCategoryByIdCommand(id, data);
  }
}
