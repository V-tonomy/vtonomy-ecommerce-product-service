import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { CLIENTS, Discount_Created } from 'vtonomy';
import { IDiscountRepository } from '../../domain';
import { Discount } from '../../domain/discount.entity';
import { CreateDiscountCommand } from '../command';

@CommandHandler(CreateDiscountCommand)
export class CreateDiscountHandler
  implements ICommandHandler<CreateDiscountCommand>
{
  constructor(
    @Inject('IDiscountRepository') private readonly discountRepository: IDiscountRepository,
    @Inject(CLIENTS.Search_Client) private readonly client: ClientProxy,
  ) {}

  async execute(command: CreateDiscountCommand): Promise<string> {
    const {
      code,
      endDate,
      maxDiscountAmount,
      perUserLimit,
      percentage,
      startDate,
      usageLimit,
    } = command.props;

    const id = randomUUID();

    const discount = new Discount(
      id,
      code,
      percentage,
      maxDiscountAmount,
      usageLimit,
      perUserLimit,
      true,
      new Date(),
      new Date(),
    );

    const existed = await this.discountRepository.findOne({ code });
    if (existed) {
      throw new ConflictException(
        `Discount with code '${code}' already exists`,
      );
    }

    await this.discountRepository.insert(discount);
    this.client.send(Discount_Created, discount).subscribe();

    return id;
  }
}
