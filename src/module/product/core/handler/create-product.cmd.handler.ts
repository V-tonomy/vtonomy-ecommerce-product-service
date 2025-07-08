import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { CLIENTS, Product_Created } from 'vtonomy';
import { IProductRepository } from '../../domain';
import { Product } from '../../domain/product.entity';
import { CreateProductCommand } from '../command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}

  async execute(command: CreateProductCommand): Promise<string> {
    const { name, description, categoryId, images, price } = command.props;

    const id = randomUUID();

    const product = new Product(
      id,
      name,
      description,
      price,
      categoryId,
      images,
      new Date(),
      new Date(),
    );

    const existed = await this.productRepository.findOne({ name });
    if (existed) {
      throw new ConflictException(`Product with name '${name}' already exists`);
    }

    await this.productRepository.insert(product);
    this.client.send(Product_Created, product).subscribe();

    return id;
  }
}
