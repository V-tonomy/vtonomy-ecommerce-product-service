import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponseDTO, ResponseDTO } from 'vtonomy';
import {
  CreateProductCommand,
  DeleteProductByIdCommand,
  UpdateProductByIdCommand,
} from '../core/command';
import { CreateProductDTO, UpdateProductDTO } from '../core/dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/')
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  async insert(@Body() body: CreateProductDTO) {
    const id = await this.commandBus.execute(CreateProductCommand.create(body));
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
