import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { CLIENTS, Product_Created } from 'vtonomy';
import { IProductRepository } from '../../domain';
import { Product } from '../../domain/product.entity';
import { CreateProductCommand } from '../command';
import slugify from 'slugify';

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
    const { name, description, categoryId, price, brandId } = command.props;

    const slug = slugify(name, { lower: true, strict: true });
    const id = randomUUID();

    const product = new Product(
      id,
      name,
      `${slug}-${id}`,
      description,
      price,
      categoryId,
      brandId,
      'ACTIVE',
      new Date(),
      new Date(),
    );

    await this.productRepository.insert(product);
    this.client.send(Product_Created, product).subscribe();

    return id;
  }
}
