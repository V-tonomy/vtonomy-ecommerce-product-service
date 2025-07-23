import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { ResponseDTO } from 'vtonomy';
import { CreateImageCommand } from '../core/command';
import { CreateImageDTO, ImageFileDTO } from '../core/dto/image.dto';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  async upload(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('productId') productId: string,
  ) {
    const imagesDTO = files.map(
      (file, index): ImageFileDTO => ({
        url: `/uploads/${file.filename}`,
        sortOrder: index + 1,
        alt: file.filename,
      }),
    );

    const dto: CreateImageDTO = {
      productId,
      files: imagesDTO,
    };

    const res = await this.commandBus.execute(CreateImageCommand.create(dto));

    return new ResponseDTO(res);
  }
}
