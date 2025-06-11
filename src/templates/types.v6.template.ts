export const BASE_TYPES_TEMPLATE_V6 =`
export interface PaginationParam {
  page?: number;
  take?: number;
}

export type SortDirection = 'asc' | 'desc';

export interface Pagination extends Required<PaginationParam> {
  totalRecords: number;
  totalPages: number;
  skip: number;
}

export interface Sort<ByData = string> {
  sortBy: ByData;
  sortDirection: SortDirection;
}
`;
