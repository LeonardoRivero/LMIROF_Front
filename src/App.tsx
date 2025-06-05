import AppRouter from "./Infraestructure/routes/AppRouter";
import "./App.css";
import ThemeContext from "./Infraestructure/context/ThemeContext";
import { DependenciesProvider } from "./Infraestructure/context/DependenciesProvider";

export default function App() {
  return (
    <div className="App">
      <ThemeContext dark={true}>
        <DependenciesProvider>
          <AppRouter />
        </DependenciesProvider>
      </ThemeContext>
    </div>
  );
}
