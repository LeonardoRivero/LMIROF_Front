import { LoginBloc } from "../../Adapters/LoginBloc";
import { ProductsPloc } from "../../Adapters/ProductsPloc";
import { SalePloc } from "../../Adapters/SalePloc";
import { SellerBloc } from "../../Adapters/SellerBloc";
import { ClientAPI } from "../utilities/HttpClientAPI";

const httpClient = new ClientAPI();
function provideLoginPloc(): LoginBloc {
  const testPloc = new LoginBloc();
  return testPloc;
}
function provideSellerPloc(): SellerBloc {
  const sellerPloc = new SellerBloc(httpClient);
  return sellerPloc;
}
function provideProductPloc(): ProductsPloc {
  const productPloc = new ProductsPloc(httpClient);
  return productPloc;
}

function provideSalePloc(): SalePloc {
  const salePloc = new SalePloc(httpClient);
  return salePloc;
}
export const dependenciesLocator = {
  provideLoginPloc,
  provideSellerPloc,
  provideProductPloc,
  provideSalePloc,
};
