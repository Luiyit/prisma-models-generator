import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

export class ProductItemModel extends Model {
  constructor(
    public model: Prisma.ProductItemDelegate = PrismaClient.getClient()
      .productItem,
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.ProductItemFindManyArgs['where'],
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.ProductItemWhereInput,
    select?: Prisma.ProductItemSelect | null,
    omit?: Prisma.ProductItemOmit | null,
    args?: {
      orderBy?:
        | Prisma.ProductItemOrderByWithRelationInput
        | Prisma.ProductItemOrderByWithRelationInput[];
      cursor?: Prisma.ProductItemWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.ProductItemFindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.ProductItemWhereInput,
    select?: Prisma.ProductItemSelect | null,
    omit?: Prisma.ProductItemOmit | null,
    args?: {
      orderBy?:
        | Prisma.ProductItemOrderByWithRelationInput
        | Prisma.ProductItemOrderByWithRelationInput[];
      cursor?: Prisma.ProductItemWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.ProductItemFindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.ProductItemWhereUniqueInput,
    select?: Prisma.ProductItemSelect | null,
    omit?: Prisma.ProductItemOmit | null,
  ) {
    const args: Prisma.ProductItemFindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findUnique(args);
  }

  create(
    data: Prisma.ProductItemCreateInput,
    select?: Prisma.ProductItemSelect | null,
    omit?: Prisma.ProductItemOmit | null,
  ) {
    const args: Prisma.ProductItemCreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.create(args);
  }

  createMany(data: Prisma.ProductItemCreateManyArgs['data']) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.ProductItemWhereUniqueInput,
    data: Prisma.ProductItemUpdateInput,
    select?: Prisma.ProductItemSelect | null,
    omit?: Prisma.ProductItemOmit | null,
  ) {
    const args: Prisma.ProductItemUpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.update(args);
  }

  updateMany(
    where: Prisma.ProductItemUpdateManyArgs['where'],
    data: Prisma.ProductItemUpdateManyArgs['data'],
  ) {
    const args: Prisma.ProductItemUpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.ProductItemWhereUniqueInput,
    select?: Prisma.ProductItemSelect | null,
    omit?: Prisma.ProductItemOmit | null,
  ) {
    const args: Prisma.ProductItemDeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.delete(args);
  }

  deleteMany(where: Prisma.ProductItemDeleteManyArgs['where']) {
    return this.model.deleteMany({ where });
  }
}
