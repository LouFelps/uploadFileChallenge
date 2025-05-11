import { Crud } from "./Crud";
import { Pagination } from "../utils/pagination/Pagination";

export interface CrudWithPagination<T> extends Crud<T> {
    findAllByPage(pagination: Pagination): Promise<T[]>;
};