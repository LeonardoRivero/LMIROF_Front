import { GetAllSellerUseCase } from "../Application/SellerUseCases";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { ILoginState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";

export class SellerBloc extends Ploc<ILoginState> {
  private service: UseCase<null, null>;
  constructor(private httpClient: HTTPClient) {
    const state: ILoginState = { firstName: "a", lastName: "a", email: "aqy@u", password: "as" };
    super(state);
    this.service = new GetAllSellerUseCase(this.httpClient);
  }
  changeEventTest() {
    console.log(this.state);
    this.changeState({ ...this.state, firstName: "false" });
    console.log(this.state);
  }
  async otherTest(a: ILoginState) {
    console.log(a);
    await this.service.execute();
  }
}
