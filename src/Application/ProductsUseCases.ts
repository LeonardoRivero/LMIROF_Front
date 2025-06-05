import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { IProductRequest } from "../Domine/IRequest";
import { ProductDetailResponse, ProductResponse, } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";
import products from './Products.json'
export class CreateProductUseCase implements UseCase<IProductRequest, ProductResponse | null> {
  httpclient: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }

  async execute(payload: IProductRequest): Promise<ProductResponse | null> {
    const response = await this.httpclient.POST(`${this.urlApi}${"create/"}`, payload);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }
    console.log(response);
    const product = await response.json();
    return product;
  }
}

export class ListAllProductUseCase implements UseCase<null, Array<ProductResponse>> {
  httpclient: HTTPClient;
  // private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
    // this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }

  async execute(): Promise<Array<ProductResponse>> {
    // const response = await this.httpclient.GET(`${this.urlApi}${"list/"}`);
    // if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
    //   return [];
    // }
    // const product = await response.json();
    return products;
  }
}

export class GetDetailProductByIdUseCase implements UseCase<number, ProductDetailResponse | null> {
  httpclient: HTTPClient;
  // private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
    // this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT + "detail/";
  }

  async execute(product_id: number): Promise<ProductDetailResponse | null> {
    // const response = await this.httpclient.GET(`${this.urlApi}${product_id}/`);
    // if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
    //   return null;
    // }
    // const product = await response.json();
    const productFinded: ProductResponse | undefined | null = products.find(p => p.id === product_id)
    let product: ProductDetailResponse = {} as ProductDetailResponse
    if (productFinded == undefined || productFinded == null) {
      return product
    }
    product = {
      id: productFinded.id,
      name: productFinded.name,
      sale_price: productFinded.sale_price.toFixed(2),
      url_image: productFinded.url_image,
      description: productFinded.description,
      characteristics: productFinded.characteristics
    }
    return product;
  }
}

export class GetAllProductsByReferenceUseCase implements UseCase<string, ProductResponse[]> {
  httpclient: HTTPClient;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
  }

  async execute(reference: string): Promise<ProductResponse[]> {
    const productFinded: ProductResponse[] = products.filter(p => p.reference === reference)
    if (productFinded == undefined || productFinded == null) {
      return []
    }
    return productFinded
  }
}

export class GetAllProductsByProviderIdUseCase implements UseCase<number, Array<ProductResponse>> {
  httpclient: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.httpclient = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PRODUCT;
  }
  async execute(providerID: number): Promise<Array<ProductResponse>> {
    const queryparams = { provider: providerID };
    const response = await this.httpclient.GET(`${this.urlApi}${"filter/"}`, queryparams);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const product = await response.json();
    return product;
  }
}
