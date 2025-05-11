import { BaseData } from "./interfaces/BaseData";

export abstract class Base<T extends BaseData>{
    private id?: string;
    private createdAt?: Date;
    private updatedAt?: Date;

    constructor(base: BaseData) {
        const {id, createdAt, updatedAt} = base;
        
        this.setId(id);
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    };
    
    public getId(): string | undefined {
        return this.id;
    };

    public setId(id?: string): void {
        if (!id) {
            delete this.id;
            return;
        }
        this.id = id;
    };

    public getCreatedAt(): Date | undefined {
        return this.createdAt;
    };

    public setCreatedAt(createdAt?: Date): void {
        if (!createdAt) {
            delete this.createdAt;
            return;
        }
        this.createdAt = createdAt;
    };

    public getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    };

    public setUpdatedAt(updatedAt?: Date): void {
        if (!updatedAt) {
            delete this.updatedAt;
            return;
        };
        this.updatedAt = updatedAt;
    };

    public abstract toObject(): T;

    public abstract toEntity(): void;
    
}