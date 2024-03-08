import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MenuNavList from "./MenuNavList";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({ palette: { mode: "dark" } });
export default function Navbar() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" sx={{ bgcolor: "#91002e" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />
            <MenuNavList />
            <Container maxWidth="xs" disableGutters>
              <SearchBar />
            </Container>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
