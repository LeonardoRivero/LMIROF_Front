import { HTTPClient, IMediatorGlobalState, UseCase } from "../../Domine/IPatterns";
import { PaymentMethodResponse, ProductResponse } from "../../Domine/IResponse";
import { ListAllProductUseCase } from "../../Application/ProductsUseCases";
import { GetAllPaymentMethod } from "../../Application/SettingsUseCases";

export default class MediatorGlobalState implements IMediatorGlobalState {
  private useCase: UseCase<null, Array<ProductResponse>>;
  private currentListProducts: Array<ProductResponse>;
  private listPaymentMethod: Array<PaymentMethodResponse>;
  private getAllPaymentMethodUseCase: UseCase<null, Array<PaymentMethodResponse>>;
  private static instance: MediatorGlobalState;

  private constructor(httpClient: HTTPClient) {
    this.useCase = new ListAllProductUseCase(httpClient);
    this.getAllPaymentMethodUseCase = new GetAllPaymentMethod(httpClient);
    this.currentListProducts = [];
    this.listPaymentMethod = [];
  }

  public static getInstance(httpClient: HTTPClient): MediatorGlobalState {
    if (!MediatorGlobalState.instance) {
      MediatorGlobalState.instance = new MediatorGlobalState(httpClient);
    }

    return MediatorGlobalState.instance;
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
