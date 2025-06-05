import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function MenuNavList() {
  const pages: Array<string> = ["Inicio"];

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            component={NavLink}
            to={page.toLowerCase()}
            className="mi-clase"
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
}
