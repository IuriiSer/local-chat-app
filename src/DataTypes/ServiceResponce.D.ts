export type ServiceResponce<T, M, O> = {
  status: T;
    // status of operation
  message?: M | string;
    // main comment for operation
  track?: O;
    // some extra data: object, etc
};
