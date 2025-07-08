import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { Category_Deleted, CLIENTS } from 'vtonomy';
import { ICategoryRepository } from '../../domain/category.interface';
import { DeleteCategoryByIdCommand } from '../command';

@CommandHandler(DeleteCategoryByIdCommand)
export class DeleteCategoryByIdHandler
  implements ICommandHandler<DeleteCategoryByIdCommand>
{
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}
  async execute(command: DeleteCategoryByIdCommand): Promise<void> {
    const id = command.id;

    try {
      await this.categoryRepository.deleteById(id);
      this.client.send(Category_Deleted, { id }).subscribe();
    } catch (error) {
      console.log('aaaa', { error });
      throw new InternalServerErrorException(error);
    }
  }
}
