export interface IProductRequest {
  name: string;
  reference: string;
  status: boolean;
  distribution_type: number;
  provider: number;
}

export interface SellerRequest {
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
