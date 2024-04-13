import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { usePlocState } from "../../common/usePlocState";

export default function CartWidget() {
  const ploc = dependenciesLocator.providerCartPloc();
  const state = usePlocState(ploc);
  return (
    <>
      <Tooltip title="Ver carrito">
        <IconButton sx={{ mx: 1 }} aria-label="carrito" size="large" color="inherit" component={Link} to="/cart">
          <Badge badgeContent={state.listOrderProducts.length} color="error">
            <ShoppingCartIcon sx={{ fontSize: 30 }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </>
  );
}
