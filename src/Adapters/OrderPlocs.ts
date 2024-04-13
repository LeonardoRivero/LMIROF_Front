import { ListAllProductUseCase } from "../Application/ProductsUseCases";
import { OrderProductRequest, OrderRequest } from "../Domine/IRequest";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { IOrderState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";
import { ProductResponse } from "../Domine/IResponse";
import { SweetAlertModal } from "../Infraestructure/utilities/NotificationsImpl";
import { ItemDTO } from "../Domine/DTOS";
import { CreateOrderUseCase } from "../Application/OrdersUseCases";

export class OrderPloc extends Ploc<IOrderState> {
  private service: UseCase<OrderRequest, null>;
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

  async createOrder(listItems: Array<ItemDTO>, sellerID: number): Promise<void> {
    const orderProduct: Array<OrderProductRequest> = listItems.map((p) => ({
      id: p.id,
      quantity: p.quantity,
    }));

    const payload: OrderRequest = {
      products: orderProduct,
      seller: 1,
    };
    const sweetModal = new SweetAlertModal();
    const confirm = await sweetModal.show("Atencion", "Verificaste tu carrito antes de crear la orden?");

    if (confirm == false) return;
    const response = await this.service.execute(payload);

    // if (response == null) {
    //   throw Error("Error creating product");
    // }
    // this.changeState({ ...this.state, name: "gfdg" });
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
