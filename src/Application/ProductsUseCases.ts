import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { IProductRequest } from "../Domine/IRequest";
import { ProductResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class CreateProductUseCase implements UseCase<IProductRequest, ProductResponse | null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }

  async execute(payload: IProductRequest): Promise<ProductResponse | null> {
    const response = await this.GenericService.POST(`${this.urlApi}${"create/"}`, payload);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }
    console.log(response);
    const product = await response.json();
    return product;
  }
}

export class ListAllProductUseCase implements UseCase<null, Array<ProductResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }

  async execute(): Promise<Array<ProductResponse>> {
    const response = await this.GenericService.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    console.log(response);
    const product = await response.json();
    return product;
  }
}
