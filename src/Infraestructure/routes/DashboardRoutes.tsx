import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../NavBar/NavBar";

import Container from "@mui/material/Container";
import ItemListCointainer from "../Item/ItemListCointainer";
import SignUp from "../login";
import NewProduct from "../Pages/Products/NewProduct";
import NewSale from "../Pages/Products/NewSale";

const DashboardRoutes = () => (
  <>
    <Navbar />
    <Container>
      <Routes>
        <Route path="/" element={<ItemListCointainer />} />
        <Route path="/products" element={<NewProduct />} />
        <Route path="/sales" element={<NewSale />} />
        {/* <Route path='/category/:categoryId' element={<ItemListCointainer />} />
        <Route path='/search/:term' element={<ItemListCointainer />} />
        <Route path='/item/:itemId' element={<ItemDetailContainer />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />

        <Route path='*' element={<Navigate to='/' />} /> */}
      </Routes>
    </Container>
  </>
);

export default DashboardRoutes;
