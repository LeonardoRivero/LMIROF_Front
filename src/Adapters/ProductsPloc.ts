import { CreateProductUseCase } from "../Application/ProductsUseCases";
import { IProductRequest } from "../Domine/IRequest";
import { HTTPClient, UseCase } from "../Domine/IPatterns";
import { IProductState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";
import { GetAllProvidersUseCase } from "../Application/ProviderUseCases";
import { DistributionProductTypeResponse, ProductResponse, ProviderResponse } from "../Domine/IResponse";
import { GetAllDistributionProductType } from "../Application/SettingsUseCases";

export class ProductsPloc extends Ploc<IProductState> {
  private service: UseCase<IProductRequest, ProductResponse | null>;
  private providerUseCase: UseCase<null, Array<ProviderResponse>>;
  private listDistributionProductUseCase: UseCase<null, Array<DistributionProductTypeResponse>>;
  constructor(private httpClient: HTTPClient) {
    const initialState: IProductState = {
      name: "",
      provider: "",
      distributionProductType: "",
      reference: "",
      listProvider: [],
      listDistributionProductType: [],
    };
    super(initialState);
    this.service = new CreateProductUseCase(this.httpClient);
    this.providerUseCase = new GetAllProvidersUseCase(this.httpClient);
    this.listDistributionProductUseCase = new GetAllDistributionProductType(this.httpClient);
  }

  async createProduct(a: IProductState): Promise<void> {
    const payload: IProductRequest = {
      status: true,
      distribution_type: parseInt(a.distributionProductType),
      name: a.name,
      provider: parseInt(a.provider),
      reference: a.reference,
    };
    const response = await this.service.execute(payload);
    if (response == null) {
      throw Error("Error creating product");
    }
  }

  async getInitialData() {
    const listProvider = await this.providerUseCase.execute();
    const listDistributionProductType = await this.listDistributionProductUseCase.execute();
    this.changeState({
      ...this.state,
      listProvider: listProvider,
      listDistributionProductType: listDistributionProductType,
    });
  }
}
