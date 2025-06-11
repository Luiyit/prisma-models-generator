import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

export class PaymentModel extends Model {
  constructor(
    public model: Prisma.PaymentDelegate = PrismaClient.getClient().payment,
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.PaymentFindManyArgs['where'],
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.PaymentWhereInput,
    select?: Prisma.PaymentSelect | null,
    omit?: Prisma.PaymentOmit | null,
    args?: {
      orderBy?:
        | Prisma.PaymentOrderByWithRelationInput
        | Prisma.PaymentOrderByWithRelationInput[];
      cursor?: Prisma.PaymentWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.PaymentFindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.PaymentWhereInput,
    select?: Prisma.PaymentSelect | null,
    omit?: Prisma.PaymentOmit | null,
    args?: {
      orderBy?:
        | Prisma.PaymentOrderByWithRelationInput
        | Prisma.PaymentOrderByWithRelationInput[];
      cursor?: Prisma.PaymentWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.PaymentFindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.PaymentWhereUniqueInput,
    select?: Prisma.PaymentSelect | null,
    omit?: Prisma.PaymentOmit | null,
  ) {
    const args: Prisma.PaymentFindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findUnique(args);
  }

  create(
    data: Prisma.PaymentCreateInput,
    select?: Prisma.PaymentSelect | null,
    omit?: Prisma.PaymentOmit | null,
  ) {
    const args: Prisma.PaymentCreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.create(args);
  }

  createMany(data: Prisma.PaymentCreateManyArgs['data']) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.PaymentWhereUniqueInput,
    data: Prisma.PaymentUpdateInput,
    select?: Prisma.PaymentSelect | null,
    omit?: Prisma.PaymentOmit | null,
  ) {
    const args: Prisma.PaymentUpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.update(args);
  }

  updateMany(
    where: Prisma.PaymentUpdateManyArgs['where'],
    data: Prisma.PaymentUpdateManyArgs['data'],
  ) {
    const args: Prisma.PaymentUpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.PaymentWhereUniqueInput,
    select?: Prisma.PaymentSelect | null,
    omit?: Prisma.PaymentOmit | null,
  ) {
    const args: Prisma.PaymentDeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.delete(args);
  }

  deleteMany(where: Prisma.PaymentDeleteManyArgs['where']) {
    return this.model.deleteMany({ where });
  }
}
