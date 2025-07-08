import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Discount_Deleted } from 'vtonomy';
import { DeleteDiscountByIdCommand } from '../command';
import { DiscountRepository } from '../../infas/discount.repository';
import { IDiscountRepository } from '../../domain';

@CommandHandler(DeleteDiscountByIdCommand)
export class DeleteDiscountByIdHandler
  implements ICommandHandler<DeleteDiscountByIdCommand>
{
  constructor(
    @Inject('IDiscountRepository') private readonly discountRepository: IDiscountRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}
  async execute(command: DeleteDiscountByIdCommand): Promise<void> {
    const id = command.id;

    try {
      await this.discountRepository.deleteById(id);
      this.client.send(Discount_Deleted, { id }).subscribe();
    } catch (error) {
      console.log('aaaa', { error });
      throw new InternalServerErrorException(error);
    }
  }
}
