import { GenderDTO, IdentificationTypeDTO } from "./DTOS";

interface DepartmentResponse {
  id: number;
  name: string;
  name_ascii: string;
  slug: string;
  geoname_id: number;
  alternate_names: string;
  display_name: string;
  geoname_code: string;
  country: number;
}
interface CountryResponse {
  id: number;
  name: string;
  name_ascii: string;
  slug: string;
  geoname_id: number;
  alternate_names: string;
  code2: string;
  code3: string;
  continent: string;
  tld: string;
  phone: string;
}
interface CityResponse {
  id: number;
  name: string;
  name_ascii: string;
  slug: string;
  geoname_id: number;
  alternate_names: string;
  display_name: string;
  geoname_code: string;
  country: number;
  region: number;
}

export interface ProviderResponse {
  id: number;
  business_name: string;
  identification: string;
  identification_type: IdentificationTypeDTO;
  address: string;
  country: CountryResponse;
  department: DepartmentResponse;
  city: CityResponse;
  email: string;
  status: boolean;
}
// export interface DistributionProductTypeResponse {
//   id: number;
//   description: string;
//   profit_seller: number;
//   profit_bussiness: number;
//   profit_operational: number;
// }

export interface ProductResponse {
  id: number;
  name: string;
  provider: ProviderResponse;
  reference: string;
  status: boolean;
  sale_price: number;
  gain_business: number;
  gain_operational: number;
  url_image: string;
}

export interface SellerResponse {
  id: number;
  name: string;
  last_name: string;
  identification_type: IdentificationTypeDTO;
  identification: string;
  email: string;
  address: string;
  gender: GenderDTO;
  status: boolean;
}

export interface SaleResponse {
  id: number;
  seller: SellerResponse;
  product: ProductResponse;
  reference_payment: string;
}

export interface ProductDetailResponse {
  name: string;
  stock: number;
  id: number;
  provider: string;
  sale_price: string;
  gain_business: string;
  gain_operational: string;
  url_image: string;
}

export interface SellerNotDepthResponse {
  id: number;
  name: string;
  last_name: string;
  identification: string;
  email: string;
  address: string;
  status: boolean;
  date_created: string;
  last_modified: string;
  identification_type: number;
  gender: number;
}

export interface ProviderResponseII {
  id: number;
  business_name: string;
  identification: string;
  address: string;
  email: string;
  status: boolean;
  date_created: string;
  last_modified: string;
  identification_type: number;
  country: number;
  department: number;
  city: number;
}

export interface ProductResponseII {
  id: number;
  name: string;
  provider: ProviderResponseII;
  reference: string;
  status: boolean;
  sale_price: number;
  gain_business: number;
  gain_operational: number;
  url_image: string;
}
export interface OrderResponse {
  id: number;
  seller: SellerNotDepthResponse;
  product: Array<ProductResponseII>;
  total: number;
  date_created: string;
}

export interface ResumeSale {
  gain_seller: number;
  date_sale: string;
  reference_payment: string;
  total: number;
}

export interface ResumeProduct {
  sale_price: number;
  name: string;
  quantity: number;
}

export interface ResumeSellerResponse {
  sales: Array<ResumeSale>;
  products: Array<ResumeProduct>;
  order_id: number;
  total_order: number;
  total_reported: number;
}

export interface SummarySellerResponse {
  name_seller: string;
  total_to_pay: number;
  resume: Array<ResumeSellerResponse>;
}

export interface PaymentMethodResponse {
  id: number;
  description: string;
  code: string;
}

export interface SimpleOrderResponse {
  id: number;
  total: number;
  is_finish: boolean;
  date_created: string;
  last_modified: string;
  seller: number;
  product: Array<number>;
}
export interface SaleDetailResponse {
  id: number;
  seller: SellerNotDepthResponse;
  order: SimpleOrderResponse;
  reference_payment: string;
  payment_method: PaymentMethodResponse;
  is_cash_payment: boolean;
  is_finish: boolean;
  gain_seller: number;
  gain_business: number;
  gain_operational: number;
  total: number;
}
