import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { MessageResponseDTO, ResponseDTO } from 'vtonomy';
import {
    CreateCategoryCommand,
    DeleteCategoryByIdCommand,
    UpdateCategoryByIdCommand,
} from '../core/command';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../core/dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/')
  async insert(@Body() body: CreateCategoryDTO) {
    const id = await this.commandBus.execute(
      CreateCategoryCommand.create(body),
    );
    return new ResponseDTO(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateCategoryDTO) {
    await this.commandBus.execute(
      UpdateCategoryByIdCommand.create(id, updateData),
    );
    return new MessageResponseDTO(`Update category with id: ${id} success`);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.commandBus.execute(DeleteCategoryByIdCommand.create(id));
    return new MessageResponseDTO(`Delete category with id: ${id} success`);
  }
}
