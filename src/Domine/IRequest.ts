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

export interface RangeDateRequest {
  start: string;
  end: string;
}

export interface PaymentOrderRequest {
  reference_payment: string;
  payment_method: number;
  is_cash_payment: boolean;
  order_id: number;
  total: number;
}

export interface PurchaseProductRequest {
  quantity: number;
  product_id: number;
  unit_price: number;
}
export interface PurchaseRequest {
  reference_invoice: string;
  tax: number;
  subtotal: number;
  total: number;
  provider: number;
  products: Array<PurchaseProductRequest>;
}
