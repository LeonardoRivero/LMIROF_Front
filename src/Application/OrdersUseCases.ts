import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { OrderRequest } from "../Domine/IRequest";
import { OrderResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class CreateOrderUseCase implements UseCase<OrderRequest, OrderResponse | null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_ORDER;
  }

  async execute(payload: OrderRequest): Promise<OrderResponse | null> {
    const response = await this.GenericService.POST(`${this.urlApi}${"create/"}`, payload);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }
    const product = await response.json();
    return product;
  }
}
