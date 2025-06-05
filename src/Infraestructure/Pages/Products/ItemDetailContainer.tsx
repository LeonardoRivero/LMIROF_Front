import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlocState } from "../../common/usePlocState";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { Box, Divider, Grid, List, Paper, Typography } from "@mui/material";
import GoBackBtn from "../../ui/GoBackBtn";
import CustomCarousel from "../Carousel";
import WhatsappButton from "../../ui/WhatsappBtn";
import { useDependencies } from "../../context/DependenciesProvider";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const { provideProductPloc } = useDependencies();
  const ploc = provideProductPloc;
  const state = usePlocState(ploc);
  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        await ploc.getDetailProductById(itemId);
      } catch (error) {
        console.error(error);
      }
    };
    getDetailProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  return state.productDetail ? (
    <Grid
      container
      spacing={4}
      sx={{ mt: 6 }}
      className="animate__animated animate__fadeIn"
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        className="animate__animated animate__fadeInLeft"
      >
        <CustomCarousel images={state.productDetail.url_image} />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <GoBackBtn />
          <Typography variant="h6">
            ${state.productDetail.sale_price}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Descripción
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: "#282c34" }}>
          <Typography
            variant="body1"
            textAlign="justify"
            sx={{ whiteSpace: "pre-line" }}
          >
            {state.productDetail.description || "Sin descripción disponible."}
          </Typography>
        </Paper>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
          Características
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: "#282c34" }}>
          <List>
            <ul style={{ margin: 0, paddingLeft: "1rem" }}>
              {state.productDetail.characteristics.map((item, index) => (
                <li key={index}>
                  <Typography variant="body2">{item}</Typography>
                </li>
              ))}
            </ul>
          </List>
        </Paper>
        <Divider />
      </Grid>
      <WhatsappButton
        phoneNumber="573185744688"
        message={`Hola, quiero más información sobre este producto: ${state.productDetail.name}`}
      />
    </Grid>
  ) : (
    <LoadingSpinner text={"Cargando..."} />
  );
}
