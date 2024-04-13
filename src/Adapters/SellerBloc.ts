import { GetAllSellerUseCase } from "../Application/SellerUseCases";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { SellerResponse } from "../Domine/IResponse";
import { ILoginState, ISellerState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";

export class SellerBloc extends Ploc<ISellerState> {
  private service: UseCase<null, Array<SellerResponse>>;
  constructor(private httpClient: HTTPClient) {
    const state: ISellerState = { allSeller: [], seller: null };
    super(state);
    this.service = new GetAllSellerUseCase(this.httpClient);
  }
  changeEventTest() {
    console.log(this.state);
    // this.changeState({ ...this.state, firstName: "false" });
    // console.log(this.state);
  }
  async otherTest(a: ILoginState) {
    console.log(a);
    // await this.service.execute();
  }

  async getAllSeller(): Promise<void> {
    const listSeller = await this.service.execute();
    this.changeState({ ...this.state, allSeller: listSeller });
  }
}
