import { useEffect } from "react";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { usePlocState } from "../../common/usePlocState";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Button, CssBaseline, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function NewSale() {
  const ploc = dependenciesLocator.provideSalePloc();
  const state = usePlocState(ploc);
  useEffect(() => {
    const getInitialData = async () => {
      await ploc.getInitialData();
    };
    getInitialData();
  }, []);

  async function handleChange(e: any) {
    const updatedValue = { [e.target.name]: e.target.value };
    ploc.changeState({
      ...state,
      ...updatedValue,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color={"black"}>
          New Sale {JSON.stringify(state.product)}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel id="productId">Seller</InputLabel>
              <Select
                labelId="productId"
                fullWidth
                required
                id="product"
                value={state.product}
                label="Product"
                name="product"
                onChange={handleChange}
              >
                {state.listProduct.length === 0 ? (
                  <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem>
                ) : (
                  state.listProduct.map((product) => {
                    return (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="productId">Product</InputLabel>
              <Select
                labelId="productId"
                fullWidth
                required
                id="product"
                value={state.product}
                label="Product"
                name="product"
                onChange={handleChange}
              >
                {state.listProduct.length === 0 ? (
                  <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem>
                ) : (
                  state.listProduct.map((product) => {
                    return (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="sale_price"
                required
                fullWidth
                id="sale_price"
                label="Quantity"
                type="text"
                autoFocus
                onChange={(event) => handleChange(event)}
                value={state.sale_price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="sale_price"
                required
                fullWidth
                id="sale_price"
                label="Price"
                type="text"
                autoFocus
                onChange={(event) => handleChange(event)}
                value={state.sale_price}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
