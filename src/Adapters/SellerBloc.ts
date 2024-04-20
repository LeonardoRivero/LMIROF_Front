import { GetAllSellerUseCase, GetSummarySellerUseCase } from "../Application/SellerUseCases";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { RangeDateRequest } from "../Domine/IRequest";
import { SellerResponse } from "../Domine/IResponse";
import { ISellerState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";
import { SwAlToast } from "../Infraestructure/utilities/NotificationsImpl";

export class SellerBloc extends Ploc<ISellerState> {
  private service: UseCase<null, Array<SellerResponse>>;
  private static instance: SellerBloc;
  private initialState: ISellerState;
  private constructor(private httpClient: HTTPClient) {
    const state: ISellerState = {
      allSeller: [],
      sellerID: "",
      startDate: "",
      endDate: "",
      summarySeller: null,
      showModal: false,
      messageModal: "",
    };
    super(state);
    this.initialState = state;
    this.service = new GetAllSellerUseCase(this.httpClient);
  }

  public static getInstance(httpClient: HTTPClient): SellerBloc {
    if (!SellerBloc.instance) {
      SellerBloc.instance = new SellerBloc(httpClient);
    }

    return SellerBloc.instance;
  }

  resetState() {
    this.changeState({ ...this.initialState });
  }

  async getAllSeller(): Promise<void> {
    const listSeller = await this.service.execute();
    this.changeState({ ...this.state, allSeller: listSeller, sellerID: "" });
  }

  async getOrderToPay(sellerID: number, rangeDate: RangeDateRequest): Promise<void> {
    const getSummarySellerUseCase = new GetSummarySellerUseCase(this.httpClient, rangeDate);
    const response = await getSummarySellerUseCase.execute(sellerID);
    if (response === null || response?.resume.length === 0) {
      this.changeState({
        ...this.state,
        // showModal: true,
        // messageModal: "No se encontraron ordenes cerradas en las fechas establecidas",
      });
      const y = new SwAlToast();
      y.setType("info");
      y.setTime(5000);
      y.show("!Ups", "No hay ordenes cerradas en ese rango");
    }
    console.log(response);
    console.log({ ...this.state });
    this.changeState({ ...this.state, summarySeller: response });
  }

  hideModal() {
    this.changeState({ ...this.state, showModal: false });
  }
}
