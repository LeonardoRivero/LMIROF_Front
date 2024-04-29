import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { usePlocState } from "../../common/usePlocState";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { useEffect } from "react";

import { ProductForBroughtDTO } from "../../../Domine/DTOS";

export default function ProviderPurchase() {
  const ploc = dependenciesLocator.providerPurchasePloc();
  const state = usePlocState(ploc);

  useEffect(() => {
    const getInitialData = async () => {
      if (state.listProducts.length == 0) {
        await ploc.getInitialData();
      }
    };
    getInitialData();
  }, []);

  async function handleChange(e: any) {
    const updatedValue = { [e.target.name]: e.target.value };

    ploc.changeState({
      ...state,
      ...updatedValue,
    });
    await ploc.getProductByProviderId(state, e.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
  }

  async function handleNavigation(productId: number, event: React.ChangeEvent<HTMLInputElement>) {
    state.productIdSelected = productId;
    ploc.handleListProductsBought(state, event.target.checked);
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid item xs={3} sm={3}>
          <TextField
            fullWidth
            required
            value={state.provider || ""}
            label="Proveedor"
            autoFocus
            name="provider"
            onChange={handleChange}
            select
          >
            {state.listProvider.length === 0 ? (
              <MenuItem disabled value="">
                <em>None</em>
              </MenuItem>
            ) : (
              state.listProvider.map((provider) => {
                return (
                  <MenuItem key={provider.id} value={provider.id}>
                    {provider.business_name}
                  </MenuItem>
                );
              })
            )}
          </TextField>
        </Grid>
      </Grid>
      <Container
        component="main"
        maxWidth="lg"
        className="animate__animated animate__fadeIn"
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={12} container spacing={2}>
            {state.listProducts.map((item: ProductForBroughtDTO) => (
              <Grid item xs={12} sm={4} lg={2} key={item.id}>
                <Card className="animate__animated animate__fadeIn" raised>
                  <CardActionArea>
                    <CardMedia component="img" height="100" image={item.url_image} alt={item.name} />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {item.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ display: "flex", justifyContent: "left" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => handleNavigation(item.id, e)}
                          name="singlePayment"
                          inputProps={{ "aria-label": "controlled" }}
                          checked={item.checked}
                        />
                      }
                      label="Agregar"
                      labelPlacement="start"
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* {state.listProducts.length >= 0 ? (
            <>
              <Divider orientation="vertical" flexItem>
                <Chip label="" size="small" />
              </Divider>
              <Grid
                item
                sm={4}
                lg={2}
                sx={{
                  padding: "0 rem",
                }}
              >
                {state.listProducts.map((product: ProductResponse) => (
                  <Fragment>
                    {product.name}
                    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}>
                      <Input required variant="standard" label="Valor Unidad" type="number" autoFocus fullWidth />
                      <Divider sx={{ height: 28, m: 2 }} orientation="vertical" />
                      <Input required variant="standard" label="Cantidad" type="number" autoFocus />
                    </Paper>
                  </Fragment>
                ))}
              </Grid>
            </>
          ) : null} */}
        </Grid>
      </Container>
    </>
  );
}
