import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Category_Updated, CLIENTS } from 'vtonomy';
import { ICategoryRepository } from '../../domain/category.interface';
import { UpdateCategoryByIdCommand } from '../command';

@CommandHandler(UpdateCategoryByIdCommand)
export class UpdateCategoryByIdHandler
  implements ICommandHandler<UpdateCategoryByIdCommand>
{
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}

  async execute(command: UpdateCategoryByIdCommand): Promise<any> {
    const props = command.props;
    const id = command.id;

    const existed = await this.categoryRepository.findById(id);
    if (!existed) {
      throw new NotFoundException(`Category with id: '${id}' does not exist`);
    }

    const isSuccess = await this.categoryRepository.updateById(id, props);
    this.client.send(Category_Updated, { id, props }).subscribe();
    return isSuccess;
  }
}
