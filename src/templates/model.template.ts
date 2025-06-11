export const MODEL_TEMPLATE =`
import PrismaClient from './PrismaClient';
import { Prisma } from '@prisma/client';
import { Pagination } from './types';
import Model from './Model';

interface #!{MODEL_NAME}Find {
  orderBy?:
    | Prisma.#!{MODEL_NAME}OrderByWithRelationInput
    | Prisma.#!{MODEL_NAME}OrderByWithRelationInput[];
  cursor?: Prisma.#!{MODEL_NAME}WhereUniqueInput;
  take?: number;
  skip?: number;
}

export class #!{CLASS_NAME} extends Model {
  constructor(
    public model: #!{PRISMA_DELEGATE} = PrismaClient.getClient().#!{MODEL_CLIENT_NAME},
  ) {
    super();
  }

  public async paginate(
    page?: number,
    take?: number,
    where?: Prisma.#!{MODEL_NAME}FindManyArgs['where'],
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.#!{MODEL_NAME}FindManyArgs['where'],
    include?: Prisma.#!{MODEL_NAME}FindManyArgs['include'],
    select?: Prisma.#!{MODEL_NAME}FindManyArgs['select'],
    args?: #!{MODEL_NAME}Find,
  ) {
    const query: Prisma.#!{MODEL_NAME}FindManyArgs = {
      where,
      ...args,
      ...this.chooseSelectOrInclude(include, select),
    };

    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.#!{MODEL_NAME}FindFirstArgs['where'],
    include?: Prisma.#!{MODEL_NAME}FindFirstArgs['include'],
    select?: Prisma.#!{MODEL_NAME}FindFirstArgs['select'],
    args?: #!{MODEL_NAME}Find,
  ) {
    const query: Prisma.#!{MODEL_NAME}FindFirstArgs = {
      where,
      ...args,
      ...this.chooseSelectOrInclude(include, select),
    };

    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.#!{MODEL_NAME}FindUniqueArgs['where'],
    include?: Prisma.#!{MODEL_NAME}FindUniqueArgs['include'],
    select?: Prisma.#!{MODEL_NAME}FindUniqueArgs['select'],
  ) {
    const args: Prisma.#!{MODEL_NAME}FindUniqueArgs = {
      where,
      ...this.chooseSelectOrInclude(include, select),
    };

    return this.model.findUnique(args);
  }

  create(
    data: Prisma.#!{MODEL_NAME}CreateArgs['data'],
    include?: Prisma.#!{MODEL_NAME}CreateArgs['include'],
    select?: Prisma.#!{MODEL_NAME}CreateArgs['select'],
  ) {
    const args: Prisma.#!{MODEL_NAME}CreateArgs = {
      data,
      ...this.chooseSelectOrInclude(include, select),
    };

    return this.model.create(args);
  }

  createMany(
    data: Prisma.#!{MODEL_NAME}CreateManyArgs['data'],
  ) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.#!{MODEL_NAME}UpdateArgs['where'],
    data: Prisma.#!{MODEL_NAME}UpdateArgs['data'],
    include?: Prisma.#!{MODEL_NAME}UpdateArgs['include'],
    select?: Prisma.#!{MODEL_NAME}UpdateArgs['select'],
  ) {
    const args: Prisma.#!{MODEL_NAME}UpdateArgs = {
      where,
      data,
      ...this.chooseSelectOrInclude(include, select),
    };

    return this.model.update(args);
  }

  updateMany(
    where: Prisma.#!{MODEL_NAME}UpdateManyArgs['where'],
    data: Prisma.#!{MODEL_NAME}UpdateManyArgs['data'],
  ) {
    const args: Prisma.#!{MODEL_NAME}UpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.#!{MODEL_NAME}DeleteArgs['where'],
    include?: Prisma.#!{MODEL_NAME}DeleteArgs['include'],
    select?: Prisma.#!{MODEL_NAME}DeleteArgs['select'],
  ) {
    const args: Prisma.#!{MODEL_NAME}DeleteArgs = {
      where,
      ...this.chooseSelectOrInclude(include, select),
    };

    return this.model.delete(args);
  }

  deleteMany(where: Prisma.#!{MODEL_NAME}DeleteManyArgs['where']) {
    return this.model.deleteMany({ where });
  }
}
`;