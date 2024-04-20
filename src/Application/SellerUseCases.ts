import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { RangeDateRequest } from "../Domine/IRequest";
import { SellerResponse, SummarySellerResponse } from "../Domine/IResponse";
import HttpStatusCode from "./Utilities/HttpStatusCodes";

export class GetAllSellerUseCase implements UseCase<null, Array<SellerResponse>> {
  GenericService: HTTPClient;
  private urlApi: string;

  public constructor(httpClient: HTTPClient) {
    this.GenericService = httpClient;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_SELLER;
  }

  async execute(): Promise<Array<SellerResponse>> {
    const response = await this.GenericService.GET(`${this.urlApi}${"list/"}`);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return [];
    }

    const listSellers = await response.json();
    return listSellers;
  }
}

export class GetSummarySellerUseCase implements UseCase<number, SummarySellerResponse | null> {
  GenericService: HTTPClient;
  private urlApi: string;
  private rangeDate: RangeDateRequest | null;

  public constructor(httpClient: HTTPClient, rangeDate: RangeDateRequest | null) {
    this.GenericService = httpClient;
    this.rangeDate = rangeDate;
    this.urlApi = import.meta.env.VITE_ROOT_CORE + import.meta.env.VITE_SUMMARYSELLER;
  }

  async execute(sellerId: number): Promise<SummarySellerResponse | null> {
    if (this.rangeDate == null) {
      throw new Error("RangeData is null");
    }
    const queryparams = { start: this.rangeDate.start, end: this.rangeDate.end };
    const response = await this.GenericService.GET(`${this.urlApi}${sellerId}${"/"}`, queryparams);
    if (!response.ok || response.status == HttpStatusCode.NO_CONTENT) {
      return null;
    }

    const summarySellers = await response.json();
    return summarySellers;
  }
}
