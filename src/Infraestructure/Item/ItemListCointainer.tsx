// import { useParams } from 'react-router-dom';

// import LoadingSpinner from "../ui/LoadingSpinner";
import ItemList from "./ItemList";
import { ItemDTO } from "../../Domine/DTOS";

export default function ItemListCointainer() {
  // const [items, setItems] = useState(null);
  // const [loading, setLoading] = useState(false);
  const arrayItems: Array<ItemDTO> = [
    { id: "kitPolipeptidosPerilla", title: "Skin Care", price: 5 },
    { id: "KIT_BioAqua", title: "Cuiado de la piel", price: 5 },
    { id: "Mantequilla_lluviaDeEstrellas", title: "Cuidado de la piel", price: 5 },
  ];

  // const { categoryId, term } = useParams();

  // useEffect(async () => {
  //   setLoading(true);

  //   const itemsRef = collection(db, 'items');
  //   const q = categoryId
  //     ? query(itemsRef, where('category', '==', categoryId))
  //     : itemsRef;

  //   try {
  //     const { docs } = await getDocs(q);
  //     const items=[{"id":'desktops-1',"title":'Skin Care',"price":5},{"id":'desktops-2',"title":'Manual',"price":5}]

  //     if (term) {
  //       const filteredItems = items.filter((item) =>
  //         item.title.toLowerCase().includes(term.trim().toLowerCase())
  //       );
  //       setItems(filteredItems);
  //     } else {
  //       setItems(items);
  //     }

  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [categoryId, term]);

  return (
    <>
      <ItemList items={arrayItems} />
    </>
  );
}
