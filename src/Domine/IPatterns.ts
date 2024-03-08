export interface HTTPClient {
  GET(path: string, queryparams?: object): Promise<Response>;
  POST(path: string, body: unknown): Promise<Response>;
  PUT(path: string, body: unknown): Promise<Response>;
  DELETE(path: string): Promise<Response>;
}

export interface UseCase<IRequest, IResponse> {
  GenericService: HTTPClient;
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}

export type NotificationType = "info" | "warning" | "success" | "error" | "question";
export interface Notificator {
  show(title?: string, message?: string): object;
  setType(type: NotificationType): void;
  setTime(timerMs: number): void;
}
