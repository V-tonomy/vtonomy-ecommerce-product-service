import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MessageResponseDTO, ResponseDTO } from 'vtonomy';
import {
  CreateProductCommand,
  DeleteProductByIdCommand,
  UpdateProductByIdCommand,
} from '../core/command';
import { CreateProductDTO, UpdateProductDTO } from '../core/dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/')
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
  async insert(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateProductDTO,
  ) {
    const images = files.map((file) => ({ url: `/uploads/${file.filename}` }));

    const id = await this.commandBus.execute(
      CreateProductCommand.create({ ...body, images }),
    );
    return new ResponseDTO(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateProductDTO) {
    await this.commandBus.execute(
      UpdateProductByIdCommand.create(id, updateData),
    );
    return new MessageResponseDTO(`Update product with id: ${id} success`);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.commandBus.execute(DeleteProductByIdCommand.create(id));
    return new MessageResponseDTO(`Delete product with id: ${id} success`);
  }
}
