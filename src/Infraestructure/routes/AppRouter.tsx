import { Routes, Route, BrowserRouter } from "react-router-dom";
import DashboardRoutes from "./DashboardRoutes";
import ProviderPurchase from "../Pages/Purchase/ProviderPurchase";
import Purchase from "../Pages/Purchase/Purchase";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<DashboardRoutes />} />
      <Route path="/purchases" element={<Purchase />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
