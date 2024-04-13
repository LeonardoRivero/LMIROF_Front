import { Dispatch, SetStateAction, createContext, useState } from "react";
import { OrderProductRequest } from "../../Domine/IRequest";
export interface TodoContextType {
  listOrderProducts: Array<OrderProductRequest>;
  localStorage: string | null;
  orderProduct: OrderProductRequest | null;
}

const initialState: TodoContextType = {
  listOrderProducts: [],
  localStorage: "",
  orderProduct: null,
};

export const CartContext = createContext<[TodoContextType, Dispatch<SetStateAction<TodoContextType>>]>([
  {} as TodoContextType,
  {} as Dispatch<SetStateAction<TodoContextType>>,
]);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [stateCart, setStateCart] = useState<TodoContextType>(initialState);

  return <CartContext.Provider value={[stateCart, setStateCart]}>{children}</CartContext.Provider>;
}
