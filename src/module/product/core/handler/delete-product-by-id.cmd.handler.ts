import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Product_Deleted } from 'vtonomy';
import { IProductRepository } from '../../domain';
import { DeleteProductByIdCommand } from '../command';

@CommandHandler(DeleteProductByIdCommand)
export class DeleteProductByIdHandler
  implements ICommandHandler<DeleteProductByIdCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}
  async execute(command: DeleteProductByIdCommand): Promise<void> {
    const id = command.id;

    try {
      await this.productRepository.deleteById(id);
      this.client.send(Product_Deleted, { id }).subscribe();
    } catch (error) {
      console.log('aaaa', { error });
      throw new InternalServerErrorException(error);
    }
  }
}
