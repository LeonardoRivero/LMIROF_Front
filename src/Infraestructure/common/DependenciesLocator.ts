import { CartPloc } from "../../Adapters/CartPloc";
import { LoginBloc } from "../../Adapters/LoginBloc";
import { OrderPloc } from "../../Adapters/OrderPlocs";
import { ProductsPloc } from "../../Adapters/ProductsPloc";
import { SalePloc } from "../../Adapters/SalePloc";
import { SellerBloc } from "../../Adapters/SellerBloc";
import MediatorUseCases from "../../Application/MediatorUseCases";
import { ClientAPI } from "../utilities/HttpClientAPI";

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

function providerMediator(): MediatorUseCases {
  const mediator = new MediatorUseCases(httpClient);
  return mediator;
}
export const dependenciesLocator = {
  provideLoginPloc,
  provideSellerPloc,
  provideProductPloc,
  provideSalePloc,
  provideOrderPloc,
  providerCartPloc,
  providerMediator,
};
