import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { ItemDTO } from "../../../Domine/DTOS";
import { usePlocState } from "../../common/usePlocState";
import { dependenciesLocator } from "../../common/DependenciesLocator";

export default function CartItem({ itemDto }: { itemDto: ItemDTO }) {
  const ploc = dependenciesLocator.providerCartPloc();
  const state = usePlocState(ploc);
  function handleRemoveItem() {
    ploc.removeItemFromCart(itemDto.id, state.listOrderProducts);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={2} display="grid" textAlign="center" justifyContent="center" alignContent="center">
          <img src={itemDto.url} alt={itemDto.id.toString()} height="150" width="150" />
        </Grid>

        <Grid item xs={12} md={2} display="grid" textAlign="center" justifyContent="center" alignContent="center">
          <Typography variant="inherit">{itemDto.title}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          display="grid"
          textAlign="center"
          justifyContent="center"
          alignContent="center"
        >
          <Box>
            <FormHelperText>Precio unitario</FormHelperText>
            <Typography variant="inherit">{"$" + itemDto.price}</Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          display="grid"
          textAlign="center"
          justifyContent="center"
          alignContent="center"
        >
          <FormHelperText>Cantidad </FormHelperText>
          <Typography variant="inherit">{itemDto.quantity}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={3}
          md={2}
          display="grid"
          textAlign="center"
          justifyContent="center"
          alignContent="center"
        >
          <FormHelperText>Subtotal </FormHelperText>
          <Typography variant="inherit">{"$" + (itemDto.price * itemDto.quantity).toFixed(2)}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={2}
          md={1}
          display="grid"
          textAlign="center"
          justifyContent="center"
          alignContent="center"
        >
          <Tooltip title="Eliminar" placement="top">
            <IconButton onClick={handleRemoveItem}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}
