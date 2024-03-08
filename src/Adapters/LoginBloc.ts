import { ILoginState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";

export class LoginBloc extends Ploc<ILoginState> {
  constructor() {
    const state: ILoginState = { firstName: "a", lastName: "a", email: "aqy@u", password: "as" };
    super(state);
  }
  changeEventTest() {
    console.log(this.state);
    this.changeState({ ...this.state, firstName: "false" });
    console.log(this.state);
  }
  otherTest(a: ILoginState) {
    console.log(a);
  }
}
