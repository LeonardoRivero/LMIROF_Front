import { HTTPClient, UseCase } from "../Domine/IPatterns";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class GetAllSellerUseCase implements UseCase<null, null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_SELLER;
  }

  async execute(): Promise<null> {
    const response = await this.GenericService.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }

    const listSellers = await response.json();
    return listSellers;
  }
}
