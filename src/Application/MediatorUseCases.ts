import { HTTPClient, IMediatorUseCases, UseCase } from "../Domine/IPatterns";
import { PaymentMethodResponse, ProductResponse } from "../Domine/IResponse";
import { ListAllProductUseCase } from "./ProductsUseCases";
import { GetAllPaymentMethod } from "./SettingsUseCases";

export default class MediatorUseCases implements IMediatorUseCases {
  private useCase: UseCase<null, Array<ProductResponse>>;
  private currentListProducts: Array<ProductResponse>;
  private listPaymentMethod: Array<PaymentMethodResponse>;
  private getAllPaymentMethodUseCase: UseCase<null, Array<PaymentMethodResponse>>;

  constructor(httpClient: HTTPClient) {
    this.useCase = new ListAllProductUseCase(httpClient);
    this.getAllPaymentMethodUseCase = new GetAllPaymentMethod(httpClient);
    this.currentListProducts = [];
    this.listPaymentMethod = [];
  }
  async getAllPaymentMethod(): Promise<PaymentMethodResponse[]> {
    if (this.listPaymentMethod.length == 0) {
      this.listPaymentMethod = await this.getAllPaymentMethodUseCase.execute();
    }
    return this.listPaymentMethod;
  }

  async getAllProducts(): Promise<ProductResponse[]> {
    if (this.currentListProducts.length == 0) {
      this.currentListProducts = await this.useCase.execute();
    }
    return this.currentListProducts;
  }
}
