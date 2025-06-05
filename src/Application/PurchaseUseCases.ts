import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { PurchaseRequest } from "../Domine/IRequest";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class ListAllProductUseCase implements UseCase<PurchaseRequest, void> {
  httpclient: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }

  async execute(payload: PurchaseRequest): Promise<void> {
    const response = await this.httpclient.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return;
    }
    const product = await response.json();
    return;
  }
}
