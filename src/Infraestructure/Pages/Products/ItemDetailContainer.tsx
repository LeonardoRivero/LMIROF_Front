import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { usePlocState } from "../../common/usePlocState";
import LoadingSpinner from "../../ui/LoadingSpinner";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const ploc = dependenciesLocator.provideProductPloc();
  const state = usePlocState(ploc);
  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        await ploc.getDetailProductById(itemId);
      } catch (error) {
        console.error(error);
      }
    };
    getDetailProduct();
  }, [itemId]);

  return state.productDetail ? <ItemDetail detail={state.productDetail} /> : <LoadingSpinner text={"Cargando..."} />;
}
