import { CartPloc } from "../../Adapters/CartPloc";
import { LoginBloc } from "../../Adapters/LoginBloc";
import { OrderPloc } from "../../Adapters/OrderPlocs";
import { ProductsPloc } from "../../Adapters/ProductsPloc";
import { SalePloc } from "../../Adapters/SalePloc";
import { SellerBloc } from "../../Adapters/SellerBloc";
import MediatorGlobalState from "./MediatorGlobalState";
import { ClientAPI } from "../utilities/HttpClientAPI";
import { FactoryNotifications } from "../utilities/NotificationsImpl";

export interface Dependencies {
  provideLoginPloc: LoginBloc
  provideSellerPloc: SellerBloc
  provideProductPloc: ProductsPloc
  provideSalePloc: SalePloc
  provideOrderPloc: OrderPloc
  providerCartPloc: CartPloc
  providerMediator: MediatorGlobalState
}
const httpClient = new ClientAPI();
const factoryNotifications = new FactoryNotifications()
function provideLoginPloc(): LoginBloc {
  const testPloc = new LoginBloc();
  return testPloc;
}

function provideSellerPloc(): SellerBloc {
  const sellerPloc = SellerBloc.getInstance(httpClient);
  return sellerPloc;
}

function provideProductPloc(): ProductsPloc {
  const productPloc = new ProductsPloc(httpClient, factoryNotifications);
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



function providerMediator(): MediatorGlobalState {
  const mediator = MediatorGlobalState.getInstance(httpClient);
  return mediator;
}
export const dependenciesLocator: Dependencies = {
  provideLoginPloc: provideLoginPloc(),
  provideSellerPloc: provideSellerPloc(),
  provideProductPloc: provideProductPloc(),
  provideSalePloc: provideSalePloc(),
  provideOrderPloc: provideOrderPloc(),
  providerCartPloc: providerCartPloc(),
  providerMediator: providerMediator(),
};
