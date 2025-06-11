import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

export class ProductModel extends Model {
  constructor(
    public model: Prisma.ProductDelegate = PrismaClient.getClient().product,
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.ProductFindManyArgs['where'],
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.ProductWhereInput,
    select?: Prisma.ProductSelect | null,
    omit?: Prisma.ProductOmit | null,
    args?: {
      orderBy?:
        | Prisma.ProductOrderByWithRelationInput
        | Prisma.ProductOrderByWithRelationInput[];
      cursor?: Prisma.ProductWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.ProductFindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.ProductWhereInput,
    select?: Prisma.ProductSelect | null,
    omit?: Prisma.ProductOmit | null,
    args?: {
      orderBy?:
        | Prisma.ProductOrderByWithRelationInput
        | Prisma.ProductOrderByWithRelationInput[];
      cursor?: Prisma.ProductWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.ProductFindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.ProductWhereUniqueInput,
    select?: Prisma.ProductSelect | null,
    omit?: Prisma.ProductOmit | null,
  ) {
    const args: Prisma.ProductFindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findUnique(args);
  }

  create(
    data: Prisma.ProductCreateInput,
    select?: Prisma.ProductSelect | null,
    omit?: Prisma.ProductOmit | null,
  ) {
    const args: Prisma.ProductCreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.create(args);
  }

  createMany(data: Prisma.ProductCreateManyArgs['data']) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
    select?: Prisma.ProductSelect | null,
    omit?: Prisma.ProductOmit | null,
  ) {
    const args: Prisma.ProductUpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.update(args);
  }

  updateMany(
    where: Prisma.ProductUpdateManyArgs['where'],
    data: Prisma.ProductUpdateManyArgs['data'],
  ) {
    const args: Prisma.ProductUpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.ProductWhereUniqueInput,
    select?: Prisma.ProductSelect | null,
    omit?: Prisma.ProductOmit | null,
  ) {
    const args: Prisma.ProductDeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.delete(args);
  }

  deleteMany(where: Prisma.ProductDeleteManyArgs['where']) {
    return this.model.deleteMany({ where });
  }
}
