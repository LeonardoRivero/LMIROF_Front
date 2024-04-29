import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/index",
//     element: <ComboBox />,
//   },
// ]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode> Remover para prevenir dos veces la recarga del componente
  <App />
  // </React.StrictMode>
);
