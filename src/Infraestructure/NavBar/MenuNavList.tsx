import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

export default function MenuNavList() {
  const pages: Array<string> = ["Cuidado de Piel", "Pijamas", "Maquillaje", "Products", "Orders"];
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            component={NavLink}
            to={page.toLowerCase()}
            sx={{
              color: "#bdbdbd",
              "&.active": { color: "white" },
              "&:hover": { color: "white" },
            }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
}
