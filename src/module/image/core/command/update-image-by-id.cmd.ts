import { ICommand } from '@nestjs/cqrs';
import { UpdateImageDTO } from '../dto/image.dto';

export class UpdateImageByIdCommand implements ICommand {
  id: string;
  props: UpdateImageDTO;

  constructor(id: string, props: UpdateImageDTO) {
    this.id = id;
    this.props = props;
  }

  static create(id: string, data: UpdateImageDTO) {
    return new UpdateImageByIdCommand(id, data);
  }
}
