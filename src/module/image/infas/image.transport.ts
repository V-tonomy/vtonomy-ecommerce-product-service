import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('image')
export class ImageController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  // @Post('/')
  // async insert(@Body() body: CreateImageDTO) {
  //   const id = await this.commandBus.execute(CreateImageCommand.create(body));
  //   return new ResponseDTO(id);
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() updateData: UpdateImageDTO) {
  //   await this.commandBus.execute(
  //     UpdateImageByIdCommand.create(id, updateData),
  //   );
  //   return new MessageResponseDTO(`Update image with id: ${id} success`);
  // }

  // @Delete(':id')
  // async deleteById(@Param('id') id: string) {
  //   await this.commandBus.execute(DeleteImageByIdCommand.create(id));
  //   return new MessageResponseDTO(`Delete image with id: ${id} success`);
  // }

  @Post('upload')
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
  uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const urls = files.map((file) => `/uploads/${file.filename}`);
    return {
      message: 'Uploaded',
      images: urls,
      ...body,
    };
  }
}
