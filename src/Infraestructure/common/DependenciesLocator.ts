import { CartPloc } from "../../Adapters/CartPloc";
import { LoginBloc } from "../../Adapters/LoginBloc";
import { OrderPloc } from "../../Adapters/OrderPlocs";
import { ProductsPloc } from "../../Adapters/ProductsPloc";
import { SalePloc } from "../../Adapters/SalePloc";
import { SellerBloc } from "../../Adapters/SellerBloc";
import MediatorGlobalState from "./MediatorGlobalState";
import { ClientAPI } from "../utilities/HttpClientAPI";
import { PurchasePloc } from "../../Adapters/PurchasePloc";

const httpClient = new ClientAPI();
function provideLoginPloc(): LoginBloc {
  const testPloc = new LoginBloc();
  return testPloc;
}

function provideSellerPloc(): SellerBloc {
  const sellerPloc = SellerBloc.getInstance(httpClient);
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

function provideOrderPloc(): OrderPloc {
  const orderPloc = new OrderPloc(httpClient);
  return orderPloc;
}

function providerCartPloc(): CartPloc {
  const cartPloc = CartPloc.getInstance();
  return cartPloc;
}

function providerPurchasePloc(): PurchasePloc {
  const mediator = PurchasePloc.getInstance(httpClient);
  return mediator;
}

function providerMediator(): MediatorGlobalState {
  const mediator = MediatorGlobalState.getInstance(httpClient);
  return mediator;
}
export const dependenciesLocator = {
  provideLoginPloc,
  provideSellerPloc,
  provideProductPloc,
  provideSalePloc,
  provideOrderPloc,
  providerCartPloc,
  providerPurchasePloc,
  providerMediator,
};
