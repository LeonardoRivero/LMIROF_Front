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
interface IdentificationTypeResponse {
  id: number;
  description: string;
  abbreviation: string;
}
export interface ProviderResponse {
  id: number;
  business_name: string;
  identification: string;
  address: string;
  email: string;
  status: boolean;
  date_created: string;
  last_modified: string;
  department: DepartmentResponse;
  country: CountryResponse;
  city: CityResponse;
  identification_type: IdentificationTypeResponse;
}
export interface DistributionProductTypeResponse {
  id: number;
  description: string;
  profit_seller: number;
  profit_bussiness: number;
  profit_operational: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  provider: ProviderResponse;
  reference: string;
  status: boolean;
  // date_created: string;
  // last_modified: string;
  // provider: number;
  distribution_type: DistributionProductTypeResponse;
  // distribution_type: number;
}

export interface SellerResponse extends SellerRequest {
  id: number;
  date_created: string;
  last_modified: string;
}

export interface SaleResponse {
  id: number;
  seller: SellerResponse;
  product: ProductResponse;
  reference_payment: string;
}
