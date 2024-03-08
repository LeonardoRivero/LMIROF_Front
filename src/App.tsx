import AppRouter from "./Infraestructure/routes/AppRouter";
import "./App.css";
import NotificationContextProvider from "./Infraestructure/context/NotificationsContext";

export default function App() {
  return (
    <div className="App">
      <NotificationContextProvider>
        <AppRouter />
      </NotificationContextProvider>
    </div>
  );
}
