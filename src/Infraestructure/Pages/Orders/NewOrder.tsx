import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Grid from "@mui/material/Grid";
// import FormControl from "@mui/material/FormControl";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import { createTheme } from "@mui/material/styles";
import { dependenciesLocator } from "../../common/DependenciesLocator";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
import { usePlocState } from "../../common/usePlocState";
// import SimpleSnackbar from "../../Notifications";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import { OrderResponse, ProductResponseII } from "../../../Domine/IResponse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function NewOrder () {
  // const navigate = useNavigate();
  const ploc = dependenciesLocator.provideOrderPloc();
  const state = usePlocState(ploc);

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   try {
  //     //   await ploc.createProduct(state);
  //     // navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function handleChange(e: any) {
  //   const updatedValue = { [e.target.name]: e.target.value };
  //   console.log(updatedValue);
  //   ploc.changeState({
  //     ...state,
  //     ...updatedValue,
  //   });
  // }

  // const handleChangeConnect = (id:number) => {
  //   console.log("The id is ", id);
  //   // setRows(
  //   //   rows.map((row) => {
  //   //     if (row.id == id) {
  //   //       return { ...row, isConnected: !row.isConnected };
  //   //     } else return { ...row };
  //   //   })
  //   // );
  // };

  async function handleChangePendingOrder(event: React.ChangeEvent<HTMLInputElement>){
    const status= event.target.checked;
    await ploc.getListOrderByStatus(status)
  }

  useEffect(() => {
    const getInitialData = async () => {
      // await ploc.getInitialData();
      await ploc.getListOrderByStatus(true)
    };
    getInitialData();
  }, []);

  return (
    <>
    {JSON.stringify(state)}
      <FormControlLabel
          control={
            <Switch checked={state.stateOrder} onChange={handleChangePendingOrder} />
          }
          label="Orden pendiente"
        />
  
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Orden N°</TableCell>
              <TableCell align="right">Nombre Vendedor</TableCell>
              <TableCell align="right">Proveedor</TableCell>
              <TableCell align="right">Resume Products</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.listOrdersPending.map((row: OrderResponse) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.seller.name}{" "}{row.seller.last_name}</TableCell>
                <TableCell align="right">{row.product.map((product: ProductResponseII) => (
                  <div key={product.id} >
                    {product.provider.business_name}
                  </div>
                ))}</TableCell>
                <TableCell align="right">{row.product.map((product: ProductResponseII) => (
                  <div key={product.id} >
                    {product.name}
                  </div>
                ))}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // <div>
    //   <FormControl sx={{ m: 1, minWidth: 120 }}>
    //     <Typography component="h1" variant="h5" color={"black"}>
    //       New Order{state.product}
    //     </Typography>

    //     <InputLabel>Products</InputLabel>
    //     <Select
    //       fullWidth
    //       required
    //       value={state.product}
    //       autoFocus
    //       name="product"
    //       onChange={handleChange}
    //       placeholder="hola"
    //     >
    //       {state.listProduct.length === 0 ? (
    //         <MenuItem disabled value="">
    //           <em>None</em>
    //         </MenuItem>
    //       ) : (
    //         state.listProduct.map((product) => {
    //           return (
    //             <MenuItem key={product.id} value={product.id}>
    //               {product.name}
    //             </MenuItem>
    //           );
    //         })
    //       )}
    //     </Select>
    //     <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
    //       Confirm
    //     </Button>
    //   </FormControl>
    // </div>
  );
}
