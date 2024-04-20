import AppRouter from "./Infraestructure/routes/AppRouter";
import "./App.css";
import NotificationContextProvider from "./Infraestructure/context/NotificationsContext";
import ThemeContext from "./Infraestructure/context/ThemeContext";
import CartProvider from "./Infraestructure/context/CartContext";

export default function App() {
  return (
    <div className="App">
      <NotificationContextProvider>
        <CartProvider>
          <ThemeContext dark>
            <AppRouter />
          </ThemeContext>
        </CartProvider>
      </NotificationContextProvider>
    </div>
  );
}
