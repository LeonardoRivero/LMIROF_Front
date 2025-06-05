import {
  CreateProductUseCase,
  GetAllProductsByReferenceUseCase,
  GetDetailProductByIdUseCase,
  ListAllProductUseCase,
} from "../Application/ProductsUseCases";
import { IProductRequest } from "../Domine/IRequest";
import { HTTPClient, IFactoryNotifications, ModalType, Notificator, UseCase } from "../Domine/IPatterns";
import { IProductState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";
import { GetAllProvidersUseCase } from "../Application/ProviderUseCases";
import { ProductDetailResponse, ProductResponse, ProviderResponse } from "../Domine/IResponse";
import { ItemDTO } from "../Domine/DTOS";
export class ProductsPloc extends Ploc<IProductState> {
  private service: UseCase<IProductRequest, ProductResponse | null>;
  private providerUseCase: UseCase<null, Array<ProviderResponse>>;
  private listProductsUseCase: UseCase<null, Array<ProductResponse>>;
  private getDetailProductByIdUseCase: UseCase<number, ProductDetailResponse | null>;
  private getAllProductsByReferenceUseCase: UseCase<string, ProductResponse[]>
  private sweetAlertModal: Notificator
  constructor(private httpClient: HTTPClient, factory: IFactoryNotifications) {
    const initialState: IProductState = {
      name: "",
      provider: "",
      reference: "",
      listProvider: [],
      salePrice: "",
      gainBusiness: "",
      gainOperational: "",
      listItems: [],
      productDetail: null,
    };
    super(initialState);
    this.service = new CreateProductUseCase(this.httpClient);
    this.providerUseCase = new GetAllProvidersUseCase(this.httpClient);
    this.listProductsUseCase = new ListAllProductUseCase(this.httpClient);
    this.getDetailProductByIdUseCase = new GetDetailProductByIdUseCase(httpClient);
    this.getAllProductsByReferenceUseCase = new GetAllProductsByReferenceUseCase(httpClient);
    this.sweetAlertModal = factory.createNotificator(ModalType.SweetAlert)
  }

  async createProduct(a: IProductState): Promise<void> {
    const payload: IProductRequest = {
      status: true,
      sale_price: parseFloat(a.salePrice),
      name: a.name,
      provider: parseInt(a.provider),
      reference: a.reference,
      gain_business: parseFloat(a.gainBusiness),
      gain_operational: parseFloat(a.gainOperational),
    };
    const confirm: boolean = await this.sweetAlertModal.show("Atencion", "Desea crear el producto?");

    if (confirm == false) return;
    const response = await this.service.execute(payload);

    if (response == null) {
      throw Error("Error creating product");
    }
    this.changeState({ ...this.state, name: "" });
  }

  async getInitialData() {
    const listProvider = await this.providerUseCase.execute();
    this.changeState({
      ...this.state,
      listProvider: listProvider,
    });
  }

  async getAllProducts(): Promise<void> {
    const listProducts = await this.listProductsUseCase.execute();
    const itemsDto: Array<ItemDTO> = listProducts.map((p) => ({
      url: p.url_image[0],
      title: p.name,
      price: p.sale_price,
      id: p.id,
      quantity: 0,
      reference: p.reference
    }));
    this.changeState({ ...this.state, listItems: itemsDto });
  }

  async getDetailProductById(product_id: string | undefined): Promise<void> {
    if (product_id === undefined) return;
    const response = await this.getDetailProductByIdUseCase.execute(parseInt(product_id));
    this.changeState({ ...this.state, productDetail: response });
  }

  async getProductsByReference(reference: string | undefined): Promise<void> {
    if (reference === undefined) return;
    const listProducts = await this.getAllProductsByReferenceUseCase.execute(reference);
    const itemsDto: Array<ItemDTO> = listProducts.map((p) => ({
      url: p.url_image[0],
      title: p.name,
      price: p.sale_price,
      id: p.id,
      quantity: 0,
      reference: p.reference
    }));
    const response = await this.getDetailProductByIdUseCase.execute(itemsDto[0].id);
    this.changeState({ ...this.state, listItems: itemsDto, productDetail: response });
  }

  filterByTitle(listItems: ItemDTO[], titleProduct: string) {
    const filteredItems = listItems.filter((item) =>
      item.title.toLowerCase().includes(titleProduct.trim().toLowerCase())
    );
    this.changeState({ ...this.state, listItems: filteredItems });
  }
}
