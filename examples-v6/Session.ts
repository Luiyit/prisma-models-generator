import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

export class SessionModel extends Model {
  constructor(
    public model: Prisma.SessionDelegate = PrismaClient.getClient().session,
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.SessionFindManyArgs['where'],
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.SessionWhereInput,
    select?: Prisma.SessionSelect | null,
    omit?: Prisma.SessionOmit | null,
    args?: {
      orderBy?:
        | Prisma.SessionOrderByWithRelationInput
        | Prisma.SessionOrderByWithRelationInput[];
      cursor?: Prisma.SessionWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.SessionFindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.SessionWhereInput,
    select?: Prisma.SessionSelect | null,
    omit?: Prisma.SessionOmit | null,
    args?: {
      orderBy?:
        | Prisma.SessionOrderByWithRelationInput
        | Prisma.SessionOrderByWithRelationInput[];
      cursor?: Prisma.SessionWhereUniqueInput;
      take?: number;
      skip?: number;
    },
  ) {
    const query: Prisma.SessionFindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.SessionWhereUniqueInput,
    select?: Prisma.SessionSelect | null,
    omit?: Prisma.SessionOmit | null,
  ) {
    const args: Prisma.SessionFindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.findUnique(args);
  }

  create(
    data: Prisma.SessionCreateInput,
    select?: Prisma.SessionSelect | null,
    omit?: Prisma.SessionOmit | null,
  ) {
    const args: Prisma.SessionCreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.create(args);
  }

  createMany(data: Prisma.SessionCreateManyArgs['data']) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.SessionWhereUniqueInput,
    data: Prisma.SessionUpdateInput,
    select?: Prisma.SessionSelect | null,
    omit?: Prisma.SessionOmit | null,
  ) {
    const args: Prisma.SessionUpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.update(args);
  }

  updateMany(
    where: Prisma.SessionUpdateManyArgs['where'],
    data: Prisma.SessionUpdateManyArgs['data'],
  ) {
    const args: Prisma.SessionUpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.SessionWhereUniqueInput,
    select?: Prisma.SessionSelect | null,
    omit?: Prisma.SessionOmit | null,
  ) {
    const args: Prisma.SessionDeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };
    return this.model.delete(args);
  }

  deleteMany(where: Prisma.SessionDeleteManyArgs['where']) {
    return this.model.deleteMany({ where });
  }
}
