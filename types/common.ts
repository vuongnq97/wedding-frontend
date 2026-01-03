export interface ApiResponse<T> {
  code: number;
  message: string;
  errorCode: string | null;
  data: T;
}
