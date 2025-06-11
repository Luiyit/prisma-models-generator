import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

interface TableFind {
  orderBy?:
    | Prisma.TableOrderByWithRelationInput
    | Prisma.TableOrderByWithRelationInput[];
  cursor?: Prisma.TableWhereUniqueInput;
  take?: number;
  skip?: number;
}

export class TableModel extends Model {
  constructor(
    public model: Prisma.TableDelegate = PrismaClient.getClient().table,
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.TableFindManyArgs['where'],
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.TableWhereInput,
    select?: Prisma.TableSelect | null,
    omit?: Prisma.TableOmit | null,
    args?: any,
  ) {
    const query: Prisma.TableFindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.TableWhereInput,
    select?: Prisma.TableSelect | null,
    omit?: Prisma.TableOmit | null,
    args?: any,
  ) {
    const query: Prisma.TableFindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.TableWhereUniqueInput,
    select?: Prisma.TableSelect | null,
    omit?: Prisma.TableOmit | null,
  ) {
    const args: Prisma.TableFindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findUnique(args);
  }

  create(
    data: Prisma.TableCreateInput,
    select?: Prisma.TableSelect | null,
    omit?: Prisma.TableOmit | null,
  ) {
    const args: Prisma.TableCreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.create(args);
  }

  createMany(data: Prisma.TableCreateManyArgs['data']) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.TableWhereUniqueInput,
    data: Prisma.TableUpdateInput,
    select?: Prisma.TableSelect | null,
    omit?: Prisma.TableOmit | null,
  ) {
    const args: Prisma.TableUpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.update(args);
  }

  updateMany(
    where: Prisma.TableUpdateManyArgs['where'],
    data: Prisma.TableUpdateManyArgs['data'],
  ) {
    const args: Prisma.TableUpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.TableWhereUniqueInput,
    select?: Prisma.TableSelect | null,
    omit?: Prisma.TableOmit | null,
  ) {
    const args: Prisma.TableDeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.delete(args);
  }

  deleteMany(where: Prisma.TableDeleteManyArgs['where']) {
    return this.model.deleteMany({ where });
  }
}
