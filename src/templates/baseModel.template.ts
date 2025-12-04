export const BASE_MODEL_TEMPLATE =`
import { Pagination } from './types';

export default class Model {
  public MIN_TAKE_VALUE: number = 1;
  public MAX_TAKE_VALUE: number = 1000;

  protected chooseSelectOrInclude<IncludeType, SelectType>(
    include: IncludeType,
    select: SelectType,
  ) {
    if (include && select)
      throw new Error('You can not use include and select at the same time');

    return (include && { include }) || { select };
  }

  protected async getPaginate(
    count: number,
    page?: number,
    take?: number,
  ): Promise<Pagination> {
    const currentPage = Number(page) || 1;
    const currentTake = Math.min(
      Number(take) || this.MIN_TAKE_VALUE,
      this.MAX_TAKE_VALUE,
    );
    const skip = (currentPage - 1) * currentTake;
    const totalPages = Math.ceil(count / currentTake);

    return {
      totalRecords: count,
      totalPages,
      page: currentPage,
      take: currentTake,
      skip,
    };
  }
}

`;
