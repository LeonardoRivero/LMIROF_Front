import { GetAllProductsByProviderIdUseCase } from "../Application/ProductsUseCases";
import { GetAllProvidersUseCase } from "../Application/ProviderUseCases";
import { ProductForBroughtDTO } from "../Domine/DTOS";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { PurchaseProductRequest } from "../Domine/IRequest";
import { ProductResponse, ProviderResponse } from "../Domine/IResponse";
import { IPurchaseState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";

export class PurchasePloc extends Ploc<IPurchaseState> {
  private providerUseCase: UseCase<null, Array<ProviderResponse>>;
  private getProductsByProviderIdUseCase: UseCase<number, Array<ProductResponse>>;
  private static instance: PurchasePloc;
  private constructor(private httpClient: HTTPClient) {
    const otherState: IPurchaseState = {
      provider: "",
      listProvider: [],
      listProducts: [],
      productIdSelected: 0,
      listProductsBought: [],
      subTotal: 0,
      tax: undefined,
      total: 0,
    };
    super(otherState);

    this.providerUseCase = new GetAllProvidersUseCase(this.httpClient);
    this.getProductsByProviderIdUseCase = new GetAllProductsByProviderIdUseCase(this.httpClient);
  }

  public static getInstance(httpClient: HTTPClient): PurchasePloc {
    if (!PurchasePloc.instance) {
      PurchasePloc.instance = new PurchasePloc(httpClient);
    }

    return PurchasePloc.instance;
  }
  async getInitialData() {
    const listProvider = await this.providerUseCase.execute();
    this.changeState({
      ...this.state,
      listProvider: listProvider,
    });
  }

  async getProductByProviderId(stateh: IPurchaseState, providerID: string): Promise<void> {
    if (stateh.provider === undefined) {
      throw new Error("OrderId is undefined");
    }

    const response = await this.getProductsByProviderIdUseCase.execute(parseInt(providerID));

    const productForBroughtDTO: Array<ProductForBroughtDTO> = response.map((product) => ({
      checked: false,
      gain_business: product.gain_business,
      gain_operational: product.gain_operational,
      id: product.id,
      name: product.name,
      provider: product.provider,
      reference: product.reference,
      sale_price: product.sale_price,
      status: product.status,
      url_image: product.url_image,
      quantity: null,
      unit_price: null,
    }));
    this.changeState({
      ...this.state,
      listProducts: productForBroughtDTO,
    });
  }

  handleListProductsBought(state: IPurchaseState, checked: boolean) {
    const yourNextList = [...state.listProducts];
    let productFiltered = yourNextList.find((item) => item.id === state.productIdSelected);
    if (productFiltered === undefined) return;
    if (checked) {
      this.state.listProductsBought.push(productFiltered);
    } else {
      const index = this.state.listProductsBought.indexOf(productFiltered, 0);
      if (index > -1) {
        this.state.listProductsBought.splice(index, 1);
      }
    }
    productFiltered.checked = checked;
    this.changeState({ ...this.state, listProducts: yourNextList });
  }

  createPurchase(listProducts: Array<ProductForBroughtDTO>) {
    console.log(listProducts);
    const y: PurchaseProductRequest[] = listProducts
      .filter((item) => item.checked === true)
      .map((item: ProductForBroughtDTO) => ({
        quantity: item.quantity ?? 0,
        product_id: item.id,
        unit_price: item.unit_price ?? 0,
      }));
    console.log(y);
  }

  updateResumePurchase() {
    const subTotal = this.state.listProducts
      .filter((item) => item.checked === true)
      .reduce((acc, item) => (acc += (item.unit_price ?? 0) * (item.quantity ?? 0)), 0);
    if (this.state.tax === undefined) {
      throw EvalError("Tax is undefined");
    }
    const h = 1 + parseInt("0.19");
    const total = subTotal * h;
    console.log(subTotal, h, total);
    this.changeState({ ...this.state, subTotal: subTotal, total: total });
  }
}
