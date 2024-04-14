import { ItemDTO } from "../Domine/DTOS";
import { ICartState } from "../Domine/IStates";
import { Ploc } from "../Domine/Ploc";

export class CartPloc extends Ploc<ICartState> {
  private static instance: CartPloc;
  private constructor() {
    const initialState: ICartState = {
      listOrderProducts: [],
      localStorage: "",
      orderProduct: null,
      showModal: false,
      messageModal: "",
    };
    super(initialState);
  }

  public static getInstance(): CartPloc {
    if (!CartPloc.instance) {
      CartPloc.instance = new CartPloc();
    }

    return CartPloc.instance;
  }

  addItemToCart(item: ItemDTO): void {
    const value = localStorage.getItem("cart");
    if (typeof value !== "string") {
      localStorage.setItem("cart", JSON.stringify([]));
      throw new Error("Localstore is wrong")
    }
    const cart: Array<ItemDTO> = JSON.parse(value);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    this.changeState({
      ...this.state,
      listOrderProducts: cart,
      showModal: true,
      messageModal: "Producto agregado correctamente",
    });
  }

  removeItemFromCart(id: number, listOrderProducts: Array<ItemDTO>): void {
    const y = listOrderProducts.filter((cartItem) => cartItem.id !== id);
    this.changeState({ ...this.state, listOrderProducts: y });
    localStorage.setItem("cart", JSON.stringify(this.state.listOrderProducts.filter((cartItem) => cartItem.id !== id)));
  }

  isInCart(itemId: number, quantity: number): boolean {
    const value = localStorage.getItem("cart");
    if (typeof value !== "string") {
      throw new Error("Localstorage is wrong");
    }

    let cart: Array<ItemDTO> = JSON.parse(value);
    console.log(cart);
    const matchItemAndQuantity = cart.some((cartItem) => cartItem.id === itemId && cartItem.quantity === quantity);
    if (matchItemAndQuantity) {
      this.changeState({ ...this.state, showModal: true, messageModal: "Producto ya fue agregado" });
      return matchItemAndQuantity;
    }
    
    const existProduct = cart.some((cartItem) => cartItem.id === itemId);
    if (existProduct) {
      const found = cart.filter((element: ItemDTO) => element.id !== itemId);
      if (found === undefined) {
        cart = []
      }
      else {
        cart = found
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return false
  }
  amountOfItemsInCart(): number {
    // const h = localStorage.getItem("cart");
    // const cart = JSON.parse(localStorage.getItem("cart")) || '""';

    const cart = this.getCurrentStateCart();
    return cart.reduce((acc: number, item: { quantity: number }) => (acc += item.quantity), 0);
  }

  getCurrentStateCart(): Array<ItemDTO> {
    const value = localStorage.getItem("cart");
    if (typeof value !== "string") {
      throw new Error("Localstorage is wrong");
    }
    const allProductsInCart: Array<ItemDTO> = JSON.parse(value);
    return allProductsInCart;
  }

  totalCartPrice(): number {
    const cart = this.getCurrentStateCart();
    return cart.reduce((acc, item) => (acc += item.price * item.quantity), 0);
  }

  hideModal() {
    this.changeState({ ...this.state, showModal: false });
  }

  resetCart(): void {
    localStorage.setItem("cart", JSON.stringify([]));
    this.changeState({ ...this.state, listOrderProducts: [] })
  }
}
