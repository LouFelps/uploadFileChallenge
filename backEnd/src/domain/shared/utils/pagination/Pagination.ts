export interface Pagination {
    skipItems(): number;
    limitItems(): number;
};

export interface PaginationData {
    page: number;
    pageSize: number;
}