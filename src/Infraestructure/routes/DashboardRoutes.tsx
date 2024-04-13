import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../NavBar/NavBar";

import Container from "@mui/material/Container";
import SignUp from "../login";
import NewProduct from "../Pages/Products/NewProduct";
import NewSale from "../Pages/Products/NewSale";
import NewOrder from "../Pages/Orders/NewOrder";
import Index from "../Pages/Index";
import ItemDetailContainer from "../Pages/Products/ItemDetailContainer";
import Cart from "../Pages/Cart/Cart";

const DashboardRoutes = () => (
  <>
    <Navbar />
    <Container>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<NewProduct />} />
        <Route path="/sales" element={<NewSale />} />
        <Route path="/orders" element={<NewOrder />} />
        <Route path="/search/:term" element={<Index />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path='/category/:categoryId' element={<ItemListCointainer />} />
        <Route path='/checkout' element={<Checkout />} />
         */}
      </Routes>
    </Container>
  </>
);

export default DashboardRoutes;
