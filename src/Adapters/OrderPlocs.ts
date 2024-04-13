import { ListAllProductUseCase } from "../Application/ProductsUseCases";
import { CreateOrderUseCase } from "../Application/OrdersUseCases";
import { OrderProductRequest, OrderRequest } from "../Domine/IRequest";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { IOrderState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";
import { OrderResponse, ProductResponse } from "../Domine/IResponse";
import { ItemDTO } from "../Domine/DTOS";

export class OrderPloc extends Ploc<IOrderState> {
  private service: UseCase<OrderRequest, OrderResponse | null>;
  private providerUseCase: UseCase<null, Array<ProductResponse>>;
  constructor(private httpClient: HTTPClient) {
    const initialState: IOrderState = {
      seller: 0,
      product: "",
      listProduct: [],
      counterProduct: 1,
    };
    super(initialState);
    this.service = new CreateOrderUseCase(this.httpClient);
    this.providerUseCase = new ListAllProductUseCase(this.httpClient);
  }

  async createOrder(listItems: Array<ItemDTO>, sellerID: string): Promise<void> {
    const orderProduct: Array<OrderProductRequest> = listItems.map((p) => ({
      id: p.id,
      quantity: p.quantity,
    }));

    const payload: OrderRequest = {
      products: orderProduct,
      seller: parseInt(sellerID),
    };

    const response = await this.service.execute(payload);

    if (response == null) {
      throw new Error();
    }
  }

  async getInitialData() {
    const listProduct = await this.providerUseCase.execute();
    this.changeState({
      ...this.state,
      listProduct: listProduct,
    });
  }

  async incrementProduct(currentValue: number) {
    const value = currentValue + 1;
    this.changeState({ ...this.state, counterProduct: value });
  }

  async decrementProduct(currentValue: number) {
    const value = currentValue - 1;
    this.changeState({ ...this.state, counterProduct: value });
  }
}
