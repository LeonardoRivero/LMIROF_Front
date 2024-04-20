import { ListAllProductUseCase } from "../Application/ProductsUseCases";
import {
  AddPaymentOrderUseCase,
  CreateOrderUseCase,
  GetAllClosedOrderUseCase,
  GetAllPendingOrderUseCase,
} from "../Application/OrdersUseCases";
import { OrderProductRequest, OrderRequest, PaymentOrderRequest, RangeDateRequest } from "../Domine/IRequest";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { IOrderState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";
import { OrderResponse, ProductResponse, SaleResponse } from "../Domine/IResponse";
import { ItemDTO } from "../Domine/DTOS";

export class OrderPloc extends Ploc<IOrderState> {
  private service: UseCase<OrderRequest, OrderResponse | null>;
  private providerUseCase: UseCase<null, Array<ProductResponse>>;
  private pendingOrderUseCase: UseCase<null, Array<OrderResponse>>;
  private closedOrderUseCase: UseCase<RangeDateRequest | null, Array<OrderResponse>>;
  private addPaymentOrderUseCase: UseCase<PaymentOrderRequest, SaleResponse | null>;
  constructor(private httpClient: HTTPClient) {
    const initialState: IOrderState = {
      seller: 0,
      product: "",
      listProduct: [],
      counterProduct: 1,
      listOrdersPending: [],
      paymentMethod: "",
      referencePayment: "",
      total: "",
      singlePayment: true,
    };
    super(initialState);
    this.service = new CreateOrderUseCase(this.httpClient);
    this.providerUseCase = new ListAllProductUseCase(this.httpClient);
    this.pendingOrderUseCase = new GetAllPendingOrderUseCase(this.httpClient);
    this.closedOrderUseCase = new GetAllClosedOrderUseCase(this.httpClient);
    this.addPaymentOrderUseCase = new AddPaymentOrderUseCase(this.httpClient);
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

  async getListOrderPending(): Promise<void> {
    const response = await this.pendingOrderUseCase.execute();
    this.changeState({ ...this.state, listOrdersPending: response });
    console.log(response);
  }

  async getListOrderClosed(): Promise<void> {
    const response = await this.closedOrderUseCase.execute(null);
    this.changeState({ ...this.state, listOrdersPending: response });
  }

  async addPaymentToOrder(currentState: IOrderState, orderId: number): Promise<void> {
    const paymentOrder: PaymentOrderRequest = {
      is_cash_payment: currentState.singlePayment,
      order_id: orderId,
      payment_method: parseInt(currentState.paymentMethod),
      reference_payment: currentState.referencePayment,
      total: parseInt(currentState.total),
    };
    await this.addPaymentOrderUseCase.execute(paymentOrder);
  }
}
