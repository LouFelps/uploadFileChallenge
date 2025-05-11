export interface Crud<T> {
    delete(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entity: T): Promise<T>;
    findAndUpdate(id: string, entity: T): Promise<T | null>;
}