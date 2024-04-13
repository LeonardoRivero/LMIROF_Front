import { ItemDTO } from "./DTOS";
import { OrderProductRequest } from "./IRequest";
import { ProductDetailResponse, ProductResponse, ProviderResponse, SaleResponse, SellerResponse } from "./IResponse";

export interface ILoginState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISellerState {
  allSeller: Array<SellerResponse>;
  sellerID: string;
}

export interface IProductState {
  name: string;
  reference: string;
  provider: string;
  listProvider: Array<ProviderResponse>;
  listItems: Array<ItemDTO>;
  salePrice: string;
  gainBusiness: string;
  gainOperational: string;
  productDetail: ProductDetailResponse | null;
}

export interface ISaleState {
  listSales: Array<SaleResponse>;
  listProduct: Array<ProductResponse>;
  product: string;
  sale_price: string;
}

export interface IOrderState {
  seller: number;
  listProduct: Array<ProductResponse>;
  product: string;
  counterProduct: number;
}

export interface ICartState {
  listOrderProducts: Array<ItemDTO>;
  localStorage: string | null;
  orderProduct: OrderProductRequest | null;
  showModal: boolean;
  messageModal: string;
}
