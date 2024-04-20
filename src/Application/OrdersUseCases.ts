import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { OrderRequest, PaymentOrderRequest, RangeDateRequest } from "../Domine/IRequest";
import { OrderResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";
import { SaleResponse } from "../Domine/IResponse";

export class CreateOrderUseCase implements UseCase<OrderRequest, OrderResponse | null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_ORDER;
  }

  async execute(payload: OrderRequest): Promise<OrderResponse | null> {
    const response = await this.GenericService.POST(`${this.urlApi}${"create/"}`, payload);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }
    const product = await response.json();
    return product;
  }
}

export class GetAllPendingOrderUseCase implements UseCase<null, Array<OrderResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_ORDER;
  }

  async execute(): Promise<Array<OrderResponse>> {
    const response = await this.GenericService.GET(`${this.urlApi}${"pending/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const allOrderPending = await response.json();
    return allOrderPending;
  }
}

export class GetAllClosedOrderUseCase implements UseCase<RangeDateRequest | null, Array<OrderResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_ORDER;
  }

  async execute(rangeDate: RangeDateRequest | null): Promise<Array<OrderResponse>> {
    let response: Response = new Response();
    if (rangeDate === null) {
      response = await this.GenericService.GET(`${this.urlApi}${"closed/"}`);
    } else {
      const queryParameter = { start: rangeDate.start, end: rangeDate.end };
      response = await this.GenericService.GET(`${this.urlApi}${"closed/"}`, queryParameter);
    }
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const allOrderPending = await response.json();
    return allOrderPending;
  }
}

export class AddPaymentOrderUseCase implements UseCase<PaymentOrderRequest, SaleResponse | null> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_SALE;
  }

  async execute(payload: PaymentOrderRequest): Promise<null> {
    const response = await this.GenericService.POST(`${this.urlApi}${"create/"}`, payload);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }

    const data = await response.json();
    return data;
  }
}
