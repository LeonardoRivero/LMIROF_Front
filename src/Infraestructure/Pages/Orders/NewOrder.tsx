import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { usePlocState } from "../../common/usePlocState";
import SimpleSnackbar from "../../Notifications";

const defaultTheme = createTheme();

const NewOrder = () => {
  const navigate = useNavigate();
  const ploc = dependenciesLocator.provideOrderPloc();
  const state = usePlocState(ploc);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      //   await ploc.createProduct(state);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChange(e: any) {
    const updatedValue = { [e.target.name]: e.target.value };
    console.log(updatedValue);
    ploc.changeState({
      ...state,
      ...updatedValue,
    });
  }

  useEffect(() => {
    const getInitialData = async () => {
      await ploc.getInitialData();
    };
    getInitialData();
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Typography component="h1" variant="h5" color={"black"}>
          New Order{state.product}
        </Typography>

        <InputLabel>Products</InputLabel>
        <Select
          fullWidth
          required
          value={state.product}
          autoFocus
          name="product"
          onChange={handleChange}
          placeholder="hola"
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm
        </Button>
      </FormControl>
    </div>
  );
};
export default NewOrder;
