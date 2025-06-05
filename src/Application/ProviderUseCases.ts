import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { ProviderResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class GetAllProvidersUseCase implements UseCase<null, Array<ProviderResponse>> {
  httpclient: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PROVIDER;
  }

  async execute(): Promise<Array<ProviderResponse>> {
    const response = await this.httpclient.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const allProviders = await response.json();
    return allProviders;
  }
}
