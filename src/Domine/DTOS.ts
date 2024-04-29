import { ProductResponse } from "./IResponse";

export interface ItemDTO {
  id: number;
  title: string;
  price: number;
  url: string;
  quantity: number;
}

export interface IdentificationTypeDTO {
  id: number;
  description: string;
  abbreviation: string;
}

export interface GenderDTO {
  id: number;
  name_gender: string;
}

export interface ProductForBroughtDTO extends ProductResponse {
  checked: boolean;
  unit_price: number | null;
  quantity: number | null;
}
