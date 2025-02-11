export interface PaginationMetaProps {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginationProps {
  meta: PaginationMetaProps;
  onPageChange: (page: number) => void;
}