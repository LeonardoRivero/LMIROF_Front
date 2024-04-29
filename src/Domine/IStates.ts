import { ItemDTO, ProductForBroughtDTO } from "./DTOS";
import { OrderProductRequest, PaymentOrderRequest } from "./IRequest";
import {
  OrderResponse,
  ProductDetailResponse,
  ProductResponse,
  ProviderResponse,
  SaleResponse,
  SellerResponse,
  SummarySellerResponse,
} from "./IResponse";

export interface ILoginState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ISellerState {
  allSeller: Array<SellerResponse>;
  sellerID: string;
  startDate: string;
  endDate: string;
  summarySeller: SummarySellerResponse | null;
  showModal: boolean;
  messageModal: string;
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
  listOrdersPending: Array<OrderResponse>;
  paymentMethod: string;
  referencePayment: string;
  total: string;
  singlePayment: boolean;
}

export interface ICartState {
  listOrderProducts: Array<ItemDTO>;
  localStorage: string | null;
  orderProduct: OrderProductRequest | null;
  showModal: boolean;
  messageModal: string;
}

export interface IPurchaseState {
  provider: string;
  listProvider: Array<ProviderResponse>;
  listProducts: Array<ProductForBroughtDTO>;
  productIdSelected: number;
  listProductsBought: Array<ProductResponse>;
  subTotal: number;
  total: number;
  tax: number | undefined;
}
