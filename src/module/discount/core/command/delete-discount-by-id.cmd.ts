import { ICommand } from '@nestjs/cqrs';

export class DeleteDiscountByIdCommand implements ICommand {
  id: string;
  constructor(id: string) {
    this.id = id;
  }

  static create(id: string) {
    return new DeleteDiscountByIdCommand(id);
  }
}
