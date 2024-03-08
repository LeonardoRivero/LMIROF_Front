import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { DistributionProductTypeResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class GetAllDistributionProductType implements UseCase<null, Array<DistributionProductTypeResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_DISTRIBUTION_PRODUCT_TYPE;
  }

  async execute(): Promise<Array<DistributionProductTypeResponse>> {
    const response = await this.GenericService.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const allProviders = await response.json();
    return allProviders;
  }
}
