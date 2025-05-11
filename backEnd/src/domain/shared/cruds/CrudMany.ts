import { Crud } from "./Crud";

export interface CrudMany<T> extends Crud<T> {
    deleteByIds(ids: Set<string>): Promise<T[]>;
    findByIds(ids: Set<string>): Promise<T[]>;
    saveMany(entities: T[]): Promise<String[]>;
}