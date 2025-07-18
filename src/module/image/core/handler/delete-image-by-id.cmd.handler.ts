import { Inject, InternalServerErrorException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Image_Deleted } from 'vtonomy';
import { ImageRepository } from '../../infas/image.repository';
import { DeleteImageByIdCommand } from '../command';

@CommandHandler(DeleteImageByIdCommand)
export class DeleteImageByIdHandler
  implements ICommandHandler<DeleteImageByIdCommand>
{
  constructor(
    @Inject('IImageRepository')
    private readonly imageRepository: ImageRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchClient: ClientProxy,
  ) {}
  async execute(command: DeleteImageByIdCommand): Promise<void> {
    const id = command.id;

    try {
      await this.imageRepository.deleteById(id);
      this.searchClient.send(Image_Deleted, { id }).subscribe();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
