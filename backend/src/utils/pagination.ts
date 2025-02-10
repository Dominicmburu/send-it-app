export interface PaginationOptions {
    page: number;
    limit: number;
  }
  
  export interface PaginationResult<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }
  
  export const paginate = <T>(
    data: T[],
    totalItems: number,
    options: PaginationOptions
  ): PaginationResult<T> => {
    const { page, limit } = options;
    const totalPages = Math.ceil(totalItems / limit);
    return {
      data,
      currentPage: page,
      totalPages,
      totalItems,
    };
  };
  