import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { usePlocState } from "../../common/usePlocState";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { ProductForBroughtDTO } from "../../../Domine/DTOS";
import { styled } from "@mui/system";
import { Box, Button, Chip, Grid, Stack, TextField } from "@mui/material";

const Input = styled(TextField)(({ theme }) => ({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
}));

export default function AlignItemsList() {
  const ploc = dependenciesLocator.providerPurchasePloc();
  const state = usePlocState(ploc);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      ploc.createPurchase(state.listProducts);
    } catch (error) {
      console.log(error);
    }
  }

  function changeUnitPrice(productID: number, unitPrice: string) {
    const yourNextList = [...state.listProducts];
    let artwork = yourNextList.find((item) => item.id === productID);
    if (artwork === undefined) return;
    artwork.unit_price = parseInt(unitPrice);
    ploc.changeState({ ...state, listProducts: yourNextList });
    ploc.updateResumePurchase();
  }

  function changeQuantity(productID: number, quantity: string) {
    const yourNextList = [...state.listProducts];
    let artwork = yourNextList.find((item) => item.id === productID);
    if (artwork === undefined) return;
    artwork.quantity = parseInt(quantity);

    ploc.changeState({ ...state, listProducts: yourNextList });
    ploc.updateResumePurchase();
  }

  async function handleChange(e: any) {
    const updatedValue = { [e.target.name]: e.target.value };
    ploc.changeState({
      ...state,
      ...updatedValue,
    });
    ploc.updateResumePurchase();
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        marginLeft: "13rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Grid item xs={9} sm={9} lg={9}>
        <List sx={{ width: "100%", maxWidth: 540 }}>
          {state.listProducts
            .filter((item) => item.checked === true)
            .map((item: ProductForBroughtDTO) => (
              <React.Fragment key={item.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={item.url_image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <React.Fragment>
                        <Stack direction={{ xs: "row-reverse", sm: "row" }}>
                          <Input
                            required
                            fullWidth
                            label="Precio unitario"
                            type="text"
                            autoFocus
                            onChange={(event) => changeUnitPrice(item.id, event.target.value)}
                            defaultValue={""}
                          />
                          <Divider orientation="vertical" sx={{ m: 1 }} />
                          <Input
                            required
                            label="Cantidad"
                            type="number"
                            autoFocus
                            sx={{ width: "30%" }}
                            onChange={(e) => changeQuantity(item.id, e.target.value)}
                            defaultValue={""}
                          />
                        </Stack>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
        </List>
      </Grid>
      <Divider orientation="vertical" flexItem>
        <Chip label="" size="small" />
      </Divider>
      <Grid item xs={2} sm={2} lg={2}>
        <Typography variant="h6" align="left">
          {" "}
          Resume
        </Typography>
        <br />
        <Input
          name="tax"
          required
          id="tax"
          type="number"
          autoFocus
          onChange={(event) => handleChange(event)}
          value={state.tax}
          label="IVA"
          size="small"
          defaultValue={""}
        />
        <br />
        <br />
        <TextField
          required
          disabled={true}
          value={state.subTotal.toFixed(2)}
          label="SubTotal"
          size="small"
          defaultValue={""}
        />
        <br />
        <br />
        <TextField required aria-readonly value={state.total.toFixed(2)} label="Total" size="small" defaultValue={""} />
        <br />
        <br />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirmar
        </Button>
      </Grid>
    </Box>
  );
}
