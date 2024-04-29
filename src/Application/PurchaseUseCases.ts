import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { PurchaseRequest } from "../Domine/IRequest";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class ListAllProductUseCase implements UseCase<PurchaseRequest, void> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }

  async execute(payload: PurchaseRequest): Promise<void> {
    const response = await this.GenericService.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return;
    }
    const product = await response.json();
    return;
  }
}
