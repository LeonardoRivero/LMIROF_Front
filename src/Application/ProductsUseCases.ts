import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { IProductRequest } from "../Domine/IRequest";
import { ProductDetailResponse, ProductResponse } from "../Domine/IResponse";
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
    const product = await response.json();
    return product;
  }
}

export class GetDetailProductByIdUseCase implements UseCase<number, ProductDetailResponse | null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT + "detail/";
  }

  async execute(product_id: number): Promise<ProductDetailResponse | null> {
    const response = await this.GenericService.GET(`${this.urlApi}${product_id}/`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }
    const product = await response.json();
    return product;
  }
}

export class GetAllProductsByProviderIdUseCase implements UseCase<number, Array<ProductResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }
  async execute(providerID: number): Promise<Array<ProductResponse>> {
    const queryparams = { provider: providerID };
    const response = await this.GenericService.GET(`${this.urlApi}${"filter/"}`, queryparams);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const product = await response.json();
    return product;
  }
}
