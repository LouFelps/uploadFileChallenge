import { Pagination } from "./Pagination";

export class SimplePagination implements Pagination {
    private pageNumber: number;

    private pageSize: number;

    constructor(pageNumber: number, pageSize: number) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    };

    public limitItems(): number {
        return this.pageSize;
    };

    public skipItems(): number {
        const itemsSkipped = this.pageSize * (this.pageNumber - 1);
        return itemsSkipped;
    };
};
