import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { NewSaleRequest } from "../Domine/IRequest";
import { SaleResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class CreateSaleUseCase implements UseCase<NewSaleRequest, SaleResponse | null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_SALE;
  }

  async execute(payload: NewSaleRequest): Promise<null> {
    const response = await this.GenericService.POST(`${this.urlApi}${"create/"}`, payload);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }

    const data = await response.json();
    return data;
  }
}
