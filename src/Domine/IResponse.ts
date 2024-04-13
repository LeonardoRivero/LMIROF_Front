import { GenderDTO, IdentificationTypeDTO } from "./DTOS";
import { SellerRequest } from "./IRequest";

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
  identification_type: IdentificationTypeDTO;
  identification: string;
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

export interface SellerResponseFaltaMejorarConBackend {
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
export interface OrderResponse {
  id: number;
  seller: SellerResponseFaltaMejorarConBackend;
  product: Array<ProductResponse>;
  total: number;
}
