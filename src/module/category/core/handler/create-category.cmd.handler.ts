import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { Category_Created, CLIENTS } from 'vtonomy';
import { Category } from '../../domain/category.entity';
import { ICategoryRepository } from '../../domain/category.interface';
import { CreateCategoryCommand } from '../command';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand>
{
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<string> {
    const { name, description, parentCategoryId } = command.props;
    const id = randomUUID();

    const category = new Category(
      id,
      name,
      description,
      parentCategoryId,
      new Date(),
      new Date(),
    );

    const existed = await this.categoryRepository.findOne({ name });
    if (existed) {
      throw new ConflictException(
        `Category with name '${name}' already exists`,
      );
    }

    await this.categoryRepository.insert(category);
    this.client.send(Category_Created, category).subscribe();

    return id;
  }
}
