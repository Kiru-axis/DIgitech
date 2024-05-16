export interface IBackendSuccess {
  message: string;
  statusCode: number;
}

export interface IBackendError {
  message: string;
  error: string;
  statusCode: number;
}

export interface IBulkDeleteResponse {
  count: number;
}
