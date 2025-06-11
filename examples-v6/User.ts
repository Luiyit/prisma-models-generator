import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

interface UserFind {
  orderBy?:
    | Prisma.UserOrderByWithRelationInput
    | Prisma.UserOrderByWithRelationInput[];
  cursor?: Prisma.UserWhereUniqueInput;
  take?: number;
  skip?: number;
}

export class UserModel extends Model {
  constructor(
    public model: Prisma.UserDelegate = PrismaClient.getClient().user,
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.UserWhereInput,
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.UserWhereInput,
    select?: Prisma.UserSelect | null,
    omit?: Prisma.UserOmit | null,
    args?: UserFind,
  ) {
    const query: Prisma.UserFindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.UserWhereInput,
    select?: Prisma.UserSelect | null,
    omit?: Prisma.UserOmit | null,
    args?: UserFind,
  ) {
    const query: Prisma.UserFindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect | null,
    omit?: Prisma.UserOmit | null,
  ) {
    const args: Prisma.UserFindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.findUnique(args);
  }

  create(
    data: Prisma.UserCreateInput,
    select?: Prisma.UserSelect | null,
    omit?: Prisma.UserOmit | null,
  ) {
    const args: Prisma.UserCreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.create(args);
  }

  createMany(data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[]) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
    select?: Prisma.UserSelect | null,
    omit?: Prisma.UserOmit | null,
  ) {
    const args: Prisma.UserUpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.update(args);
  }

  updateMany(
    where: Prisma.UserWhereInput,
    data: Prisma.UserUpdateManyMutationInput,
  ) {
    const args: Prisma.UserUpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect | null,
    omit?: Prisma.UserOmit | null,
  ) {
    const args: Prisma.UserDeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.delete(args);
  }

  deleteMany(where: Prisma.UserWhereInput) {
    return this.model.deleteMany({ where });
  }
}
