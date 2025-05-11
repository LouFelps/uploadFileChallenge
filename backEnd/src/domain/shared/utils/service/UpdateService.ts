import { Service } from './Service';

export interface UpdateParams<T> {
  id: string;
  update: T;
}

export interface UpdateService<T> extends Service<UpdateParams<T>, T | null> {

}
