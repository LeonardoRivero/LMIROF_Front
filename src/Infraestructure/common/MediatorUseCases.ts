import { HTTPClient, IMediatorUseCases, UseCase } from "../../Domine/IPatterns";
import { ProductResponse } from "../../Domine/IResponse";
import { ListAllProductUseCase } from "../../Application/ProductsUseCases";

export default class MediatorUseCases implements IMediatorUseCases {
  private useCase: UseCase<null, Array<ProductResponse>>;
  private currentListProducts: Array<ProductResponse>;

  constructor(httpClient: HTTPClient) {
    this.useCase = new ListAllProductUseCase(httpClient);
    this.currentListProducts = [];
  }
  async getAllProducts(): Promise<ProductResponse[]> {
    if (this.currentListProducts.length == 0) {
      this.currentListProducts = await this.useCase.execute();
    }
    return this.currentListProducts;
  }
}
