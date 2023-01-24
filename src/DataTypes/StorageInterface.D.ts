// Common interface tamlate for all Interfaces that work with localStorage
export abstract class StorageInterface<G, U, A> {
  abstract getByQuery: G;
  // get all entyties ()
  abstract addNew: U;
  // add new user to the storage
  abstract updateData: A;
  // update the user by his id

  abstract eraseCache: () => void;
  // method to erase cache
}

export type DataInStoradge<K> = {
  [key: string]: K
}