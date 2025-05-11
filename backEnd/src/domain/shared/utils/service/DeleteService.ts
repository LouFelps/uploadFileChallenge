import { Service } from './Service';

export interface DeleteService<T> extends Service<{ id: string }, T | null> {

}
