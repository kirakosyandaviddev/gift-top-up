export type ResponseType<T = null> = {
  data: T;
  error: string | null;
};
