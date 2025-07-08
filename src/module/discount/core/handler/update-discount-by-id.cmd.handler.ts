import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Discount_Updated } from 'vtonomy';
import { DiscountRepository } from '../../infas/discount.repository';
import { UpdateDiscountByIdCommand } from '../command';
import { IDiscountRepository } from '../../domain';

@CommandHandler(UpdateDiscountByIdCommand)
export class UpdateDiscountByIdHandler
  implements ICommandHandler<UpdateDiscountByIdCommand>
{
  constructor(
    @Inject('IDiscountRepository') private readonly discountRepository: IDiscountRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}

  async execute(command: UpdateDiscountByIdCommand): Promise<any> {
    const props = command.props;
    const id = command.id;

    const existed = await this.discountRepository.findById(id);
    if (!existed) {
      throw new NotFoundException(`Discount with id: '${id}' does not exist`);
    }

    const isSuccess = await this.discountRepository.updateById(id, props);
    this.client.send(Discount_Updated, { id, props }).subscribe();
    return isSuccess;
  }
}
