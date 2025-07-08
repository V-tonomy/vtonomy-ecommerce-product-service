import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessageResponseDTO, ResponseDTO } from 'vtonomy';
import {
  CreateDiscountCommand,
  DeleteDiscountByIdCommand,
  UpdateDiscountByIdCommand,
} from '../core/command';
import { CreateDiscountDTO, UpdateDiscountDTO } from '../core/dto/discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/')
  async insert(@Body() body: CreateDiscountDTO) {
    const id = await this.commandBus.execute(
      CreateDiscountCommand.create({ ...body }),
    );
    return new ResponseDTO(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateDiscountDTO) {
    await this.commandBus.execute(
      UpdateDiscountByIdCommand.create(id, updateData),
    );
    return new MessageResponseDTO(`Update discount with id: ${id} success`);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.commandBus.execute(DeleteDiscountByIdCommand.create(id));
    return new MessageResponseDTO(`Delete discount with id: ${id} success`);
  }
}
