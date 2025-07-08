import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { CLIENTS, Image_Updated } from 'vtonomy';
import { ImageRepository } from '../../infas/image.repository';
import { UpdateImageByIdCommand } from '../command';

@CommandHandler(UpdateImageByIdCommand)
export class UpdateImageByIdHandler
  implements ICommandHandler<UpdateImageByIdCommand>
{
  constructor(
    @Inject('IImageRepository')
    private readonly imageRepository: ImageRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}

  async execute(command: UpdateImageByIdCommand): Promise<any> {
    const props = command.props;
    const id = command.id;

    const existed = await this.imageRepository.findById(id);
    if (!existed) {
      throw new NotFoundException(`Image with id: '${id}' does not exist`);
    }

    const isSuccess = await this.imageRepository.updateById(id, props);
    this.client.send(Image_Updated, { id, props }).subscribe();
    return isSuccess;
  }
}
