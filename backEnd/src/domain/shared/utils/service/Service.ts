export interface Service<G, T> {
  execute(params: G): Promise<T>;
}
