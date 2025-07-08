import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Product_Updated } from 'vtonomy';
import { IProductRepository } from '../../domain';
import { UpdateProductByIdCommand } from '../command';

@CommandHandler(UpdateProductByIdCommand)
export class UpdateProductByIdHandler
  implements ICommandHandler<UpdateProductByIdCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}

  async execute(command: UpdateProductByIdCommand): Promise<any> {
    const props = command.props;
    const id = command.id;

    const existed = await this.productRepository.findById(id);
    if (!existed) {
      throw new NotFoundException(`Product with id: '${id}' does not exist`);
    }

    const isSuccess = await this.productRepository.updateById(id, props);
    this.client.send(Product_Updated, { id, props }).subscribe();
    return isSuccess;
  }
}
