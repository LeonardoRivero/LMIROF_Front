import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { SaleDetailResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class SaleDetailByOrderIDUseCase implements UseCase<number, SaleDetailResponse | null> {
  httpclient: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_SALE;
  }

  async execute(order_id: number): Promise<SaleDetailResponse | null> {
    const queryParams = { order: order_id };
    const response = await this.httpclient.GET(`${this.urlApi}${"filter/"}`, queryParams);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }

    const data = await response.json();
    return data;
  }
}
