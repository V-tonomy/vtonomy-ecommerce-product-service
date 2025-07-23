import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { CLIENTS, Image_Created } from 'vtonomy';
import { IImageRepository, Image } from '../../domain';
import { CreateImageCommand } from '../command';

@CommandHandler(CreateImageCommand)
export class CreateImageHandler implements ICommandHandler<CreateImageCommand> {
  constructor(
    @Inject('IImageRepository')
    private readonly imageRepository: IImageRepository,
    @Inject(CLIENTS.Search_Client) private readonly searchClient: ClientProxy,
  ) {}

  async execute(command: CreateImageCommand): Promise<any> {
    const { files, productId } = command.props;

    const images = files.map(
      (file) =>
        new Image({
          id: randomUUID(),
          productId,
          url: file.url,
          alt: file.url,
          sortOrder: file.sortOrder,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
    );

    await this.imageRepository.insertMany(images);

    this.searchClient.send(Image_Created, images).subscribe();

    return images.map((item) => item.id);
  }
}
