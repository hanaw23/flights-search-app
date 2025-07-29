interface BaseResponse<T> {
  status: boolean;
  message?: string;
  timestamp: number;
  data: T;
}
