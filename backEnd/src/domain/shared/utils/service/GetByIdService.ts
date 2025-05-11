import { Service } from './Service';

export interface GetByIdService<T> extends Service<{ id: string }, T | null> {

}
