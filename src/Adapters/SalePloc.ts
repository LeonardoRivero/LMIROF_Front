import { ListAllProductUseCase } from "../Application/ProductsUseCases";
import { SaleDetailByOrderIDUseCase } from "../Application/SaleUseCases";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { ProductResponse, SaleDetailResponse } from "../Domine/IResponse";
import { ISaleState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";

export class SalePloc extends Ploc<ISaleState> {
  private listAllProductUseCase: UseCase<null, Array<ProductResponse>>;
  private saleDetailByOrderIDUseCase: UseCase<number, SaleDetailResponse | null>;

  constructor(private httpClient: HTTPClient) {
    const state: ISaleState = { listSales: [], product: "", listProduct: [], sale_price: "" };
    super(state);
    this.listAllProductUseCase = new ListAllProductUseCase(this.httpClient);
    this.saleDetailByOrderIDUseCase = new SaleDetailByOrderIDUseCase(this.httpClient);
  }
  changeEventTest() {
    console.log(this.state);
    // this.changeState({ ...this.state, });
    // console.log(this.state);
  }
  async getInitialData() {
    // console.log(a);
    // await this.service.execute();
    const y = await this.listAllProductUseCase.execute();
    this.changeState({ ...this.state, listProduct: y });
    console.log(y);
  }

  async getSaleDetailByOrderID(orderID: string | undefined) {
    if (orderID === undefined) {
      throw new Error("OrderId is undefined");
    }
    const y = await this.saleDetailByOrderIDUseCase.execute(parseInt(orderID));
    console.log(y);
  }
}
