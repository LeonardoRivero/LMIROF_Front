import { Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import MenuItem from "@mui/material/MenuItem";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import GoBackBtn from "../../ui/GoBackBtn";
import CartItem from "./CartItem";
import { usePlocState } from "../../common/usePlocState";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { SwAlModalWithButtons } from "../../utilities/NotificationsImpl";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartPloc = dependenciesLocator.providerCartPloc();
  const stateCart = usePlocState(cartPloc);
  const cart = cartPloc.getCurrentStateCart();

  const sellerPloc = dependenciesLocator.provideSellerPloc();
  const sellerState = usePlocState(sellerPloc);

  const plocOrder = dependenciesLocator.provideOrderPloc();
  const navigate = useNavigate();

  async function handleClick() {
    if (sellerState.sellerID == null) return;
    const sweetModal = new SwAlModalWithButtons();
    try {
      const confirm = await sweetModal.show("Atencion", "Verificaste tu carrito antes de crear la orden?");
      if (confirm == false) return;
      await plocOrder.createOrder(cart, sellerState.sellerID);
      sweetModal.setType("success");
      await sweetModal.show("Excelente", "Orden creada correctamente");
      navigate("/");
    } catch (error) {
      sweetModal.setType("error");
      await sweetModal.show("Atencion", "Error al crear la orden");
    }
  }

  function handleChangeSeller(e: any) {
    const updatedValue = { [e.target.name]: e.target.value };
    sellerPloc.changeState({
      ...sellerState,
      ...updatedValue,
    });
  }

  useEffect(() => {
    const getListSeller = async () => {
      await sellerPloc.getAllSeller();
    };
    getListSeller();
  }, []);

  return (
    <>
      <h2>{`Solicitud Orden: (${cartPloc.amountOfItemsInCart()}) unidades`}</h2>
      <hr />
      {sellerState.sellerID}
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid item xs={12} sm={3}>
          <TextField
            size="small"
            label="Vendedor@ .."
            sx={{ width: 200 }}
            select
            value={sellerState.sellerID}
            onChange={handleChangeSeller}
            name="sellerID"
            autoFocus
          >
            {sellerState.allSeller.length === 0 ? (
              <MenuItem disabled value="">
                <em>None</em>
              </MenuItem>
            ) : (
              sellerState.allSeller.map((seller) => {
                return (
                  <MenuItem key={seller.id} value={seller.id}>
                    {`${seller.name} ${" "} ${seller.last_name}`}
                  </MenuItem>
                );
              })
            )}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box display="flex" justifyContent={"center"}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClick}
              startIcon={<LoyaltyIcon />}
              disabled={sellerState.sellerID == "" || stateCart.listOrderProducts.length == 0}
            >
              Generar orden
            </Button>
          </Box>
        </Grid>
      </Grid>
      <br />
      {cart.length > 0 ? (
        <>
          <Container className="animate__animated animate__fadeIn">
            {cart.map((item) => (
              <Fragment key={item.id}>
                <CartItem itemDto={item} />
                <Divider variant="middle" sx={{ my: 3 }} />
              </Fragment>
            ))}
          </Container>

          <Typography variant="h6" align="right" className="animate__animated animate__fadeInUp">
            Total: {"$" + cartPloc.totalCartPrice().toFixed(2)}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" align="center" sx={{ my: 5 }}>
            No hay productos en el carrito
          </Typography>
        </>
      )}
      <GoBackBtn />
    </>
  );
}
