import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { OrderProductRequest, OrderRequest } from "../Domine/IRequest";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class CreateOrderUseCase implements UseCase<OrderRequest, null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }

  async execute(payload: OrderRequest): Promise<null> {
    const response = await this.GenericService.POST(`${this.urlApi}${"create/"}`, payload);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }
    console.log(response);
    const product = await response.json();
    return product;
  }
}
