export const MODEL_TEMPLATE_V6 =`
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
    where?: Prisma.#!{MODEL_NAME}WhereInput,
  ): Promise<Pagination> {
    const count = await this.model.count({ where });
    return super.getPaginate(count, page, take);
  }

  all() {
    return this.model.findMany();
  }

  find(
    where: Prisma.#!{MODEL_NAME}WhereInput,
    select?: Prisma.#!{MODEL_NAME}Select | null,
    omit?: Prisma.#!{MODEL_NAME}Omit | null,
    args?: #!{MODEL_NAME}Find,
  ) {
    const query: Prisma.#!{MODEL_NAME}FindManyArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.findMany(query);
  }

  findFirst(
    where: Prisma.#!{MODEL_NAME}WhereInput,
    select?: Prisma.#!{MODEL_NAME}Select | null,
    omit?: Prisma.#!{MODEL_NAME}Omit | null,
    args?: #!{MODEL_NAME}Find,
  ) {
    const query: Prisma.#!{MODEL_NAME}FindFirstArgs = {
      where,
      ...args,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.findFirst(query);
  }

  findUnique(
    where: Prisma.#!{MODEL_NAME}WhereUniqueInput,
    select?: Prisma.#!{MODEL_NAME}Select | null,
    omit?: Prisma.#!{MODEL_NAME}Omit | null,
  ) {
    const args: Prisma.#!{MODEL_NAME}FindUniqueArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.findUnique(args);
  }

  create(
    data: Prisma.#!{MODEL_NAME}CreateInput,
    select?: Prisma.#!{MODEL_NAME}Select | null,
    omit?: Prisma.#!{MODEL_NAME}Omit | null,
  ) {
    const args: Prisma.#!{MODEL_NAME}CreateArgs = {
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.create(args);
  }

  createMany(
    data: Prisma.#!{MODEL_NAME}CreateManyInput | Prisma.#!{MODEL_NAME}CreateManyInput[],
  ) {
    return this.model.createMany({ data });
  }

  update(
    where: Prisma.#!{MODEL_NAME}WhereUniqueInput,
    data: Prisma.#!{MODEL_NAME}UpdateInput,
    select?: Prisma.#!{MODEL_NAME}Select | null,
    omit?: Prisma.#!{MODEL_NAME}Omit | null,
  ) {
    const args: Prisma.#!{MODEL_NAME}UpdateArgs = {
      where,
      data,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.update(args);
  }

  updateMany(
    where: Prisma.#!{MODEL_NAME}WhereInput,
    data: Prisma.#!{MODEL_NAME}UpdateManyMutationInput,
  ) {
    const args: Prisma.#!{MODEL_NAME}UpdateManyArgs = {
      where,
      data,
    };

    return this.model.updateMany(args);
  }

  delete(
    where: Prisma.#!{MODEL_NAME}WhereUniqueInput,
    select?: Prisma.#!{MODEL_NAME}Select | null,
    omit?: Prisma.#!{MODEL_NAME}Omit | null,
  ) {
    const args: Prisma.#!{MODEL_NAME}DeleteArgs = {
      where,
      ...(select ? { select } : {}),
      ...(omit ? { omit } : {}),
    };

    return this.model.delete(args);
  }

  deleteMany(where: Prisma.#!{MODEL_NAME}WhereInput) {
    return this.model.deleteMany({ where });
  }
}
`;