import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { ProviderResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class GetAllProvidersUseCase implements UseCase<null, Array<ProviderResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PROVIDER;
  }

  async execute(): Promise<Array<ProviderResponse>> {
    const response = await this.GenericService.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const allProviders = await response.json();
    return allProviders;
  }
}
