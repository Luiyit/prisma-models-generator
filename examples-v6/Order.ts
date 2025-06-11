import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

export class OrderModel extends Model {
  constructor(
    public model: Prisma.OrderDelegate = PrismaClient.getClient().order,
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.OrderFindManyArgs['where'],
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.OrderWhereInput,
    select?: Prisma.OrderSelect | null,
    omit?: Prisma.OrderOmit | null,
    args?: {
      orderBy?:
        | Prisma.OrderOrderByWithRelationInput
        | Prisma.OrderOrderByWithRelationInput[];
      cursor?: Prisma.OrderWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.OrderFindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.OrderWhereInput,
    select?: Prisma.OrderSelect | null,
    omit?: Prisma.OrderOmit | null,
    args?: {
      orderBy?:
        | Prisma.OrderOrderByWithRelationInput
        | Prisma.OrderOrderByWithRelationInput[];
      cursor?: Prisma.OrderWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.OrderFindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.OrderWhereUniqueInput,
    select?: Prisma.OrderSelect | null,
    omit?: Prisma.OrderOmit | null,
  ) {
    const args: Prisma.OrderFindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findUnique(args);
  }

  create(
    data: Prisma.OrderCreateInput,
    select?: Prisma.OrderSelect | null,
    omit?: Prisma.OrderOmit | null,
  ) {
    const args: Prisma.OrderCreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.create(args);
  }

  update(
    where: Prisma.OrderWhereUniqueInput,
    data: Prisma.OrderUpdateInput,
    select?: Prisma.OrderSelect | null,
    omit?: Prisma.OrderOmit | null,
  ) {
    const args: Prisma.OrderUpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.update(args);
  }

  delete(
    where: Prisma.OrderWhereUniqueInput,
    select?: Prisma.OrderSelect | null,
    omit?: Prisma.OrderOmit | null,
  ) {
    const args: Prisma.OrderDeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.delete(args);
  }

  deleteMany(where: Prisma.OrderDeleteManyArgs['where']) {
    return this.model.deleteMany({ where });
  }
}
