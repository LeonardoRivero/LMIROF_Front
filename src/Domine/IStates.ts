import { DistributionProductTypeResponse, ProductResponse, ProviderResponse, SaleResponse } from "./IResponse";

export interface ITestState {
  enable: boolean;
  nm: number;
}

export interface ILoginState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IProductState {
  name: string;
  reference: string;
  provider: string;
  distributionProductType: string;
  listProvider: Array<ProviderResponse>;
  listDistributionProductType: Array<DistributionProductTypeResponse>;
}

export interface ISaleState {
  listSales: Array<SaleResponse>;
  listProduct: Array<ProductResponse>;
  product: string;
  sale_price: string;
}
