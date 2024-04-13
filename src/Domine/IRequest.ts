export interface IProductRequest {
  name: string;
  reference: string;
  status: boolean;
  sale_price: number;
  provider: number;
  gain_business: number;
  gain_operational: number;
}

export interface ProviderRequest {
  business_name: string;
  identification: string;
  address: string;
  email: string;
  status: true;
  identification_type: number;
  country: number;
  department: number;
  city: number;
}

export interface SaleProductRequest {
  quantity: number;
  sale_price: number;
  id: number;
}

export interface NewSaleRequest {
  reference_payment: string;
  seller: number;
  products: Array<SaleProductRequest>;
}

export interface OrderRequest {
  seller: number;
  products: Array<OrderProductRequest>;
}
export interface OrderProductRequest {
  quantity: number;
  id: number;
}

export interface SellerRequest {
  name: string;
  last_name: string;
  identification_type: number;
  identification: string;
  email: string;
  address: string;
  gender: number;
  status: boolean;
}
