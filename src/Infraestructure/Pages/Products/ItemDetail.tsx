import { Link } from "react-router-dom";
import { Alert, Snackbar,Box,Divider,CardMedia,Typography,Button,Grid,Card } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { ProductDetailResponse } from "../../../Domine/IResponse";
import GoBackBtn from "../../ui/GoBackBtn";
import ItemCount from "./ItemCount";
import ItemDescription from "./ItemDescription";
import { usePlocState } from "../../common/usePlocState";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { ItemDTO } from "../../../Domine/DTOS";

export default function ItemDetail({ detail }: { detail: ProductDetailResponse }) {
  const ploc = dependenciesLocator.providerCartPloc();
  const state = usePlocState(ploc);

  function handleAddItemToCart(quantity: number) {
    if (ploc.isInCart(detail.id,quantity) || quantity === 0) return;
    const orderProduct: ItemDTO = {
      id: detail.id,
      price: parseFloat(detail.sale_price),
      quantity: quantity,
      title: detail.name,
      url: detail.url_image,
    };
    ploc.addItemToCart(orderProduct);
  }

  function handleClose() {
    ploc.hideModal();
  }

  return (
    <>
      <Grid container mt={5} className="animate__animated animate__fadeIn" spacing={3}>
        <Grid item sm={6} md={4} className="animate__animated animate__fadeInLeft">
          <Card raised>
            <CardMedia component="img" image={detail.url_image} />
          </Card>
          <Box display="flex" justifyContent="space-between" mt={1} alignContent="center">
            <GoBackBtn />

            <Typography component="h5" variant="h6" textAlign="center">
              ${detail.sale_price}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Typography component="h3" textAlign="center" gutterBottom>
            {detail.name}
          </Typography>
          <Divider />
          <ItemDescription characteristics={detail.provider} />
          <Divider sx={{ mb: 2 }} />

          <Box display="flex" justifyContent={"center"}>
            {false ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<AssignmentTurnedInIcon />}
                component={Link}
                to="/cart"
              >
                Terminar mi compra
              </Button>
            ) : detail.stock > 0 ? (
              <ItemCount stock={detail.stock} onAdd={handleAddItemToCart} />
            ) : (
              <Typography variant="h6" color="textSecondary">
                Sin stock
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={state.showModal} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {state.messageModal}
        </Alert>
      </Snackbar>
    </>
  );
}
