import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { PaymentMethodResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class GetAllPaymentMethod implements UseCase<null, Array<PaymentMethodResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_PAYMENT_METHOD;
  }

  async execute(): Promise<Array<PaymentMethodResponse>> {
    const response = await this.GenericService.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }
    const allProviders = await response.json();
    return allProviders;
  }
}
