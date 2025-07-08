import { ICommand } from '@nestjs/cqrs';
import { CreateCategoryDTO } from '../dto/category.dto';

export class CreateCategoryCommand implements ICommand {
  props: CreateCategoryDTO;

  constructor(props: CreateCategoryDTO) {
    this.props = props;
  }

  static create(data: CreateCategoryDTO) {
    return new CreateCategoryCommand(data);
  }
}
