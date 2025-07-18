import { ICommand } from '@nestjs/cqrs';
import { CreateImageDTO } from '../dto/image.dto';

export class CreateImageCommand implements ICommand {
  props: CreateImageDTO;

  constructor(props: CreateImageDTO) {
    this.props = props;
  }

  static create(data: CreateImageDTO) {
    return new CreateImageCommand(data);
  }
}
