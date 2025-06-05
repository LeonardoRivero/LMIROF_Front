import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../NavBar/NavBar";
import Container from "@mui/material/Container";
import Index from "../Pages/Index";
import ItemDetailContainer from "../Pages/Products/ItemDetailContainer";

const DashboardRoutes = () => (
  <>
    <Navbar />
    <Container>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/search/:term" element={<Index />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
      </Routes>
    </Container>
  </>
);

export default DashboardRoutes;
