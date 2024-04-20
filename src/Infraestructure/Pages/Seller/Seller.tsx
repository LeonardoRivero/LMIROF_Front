import { useEffect, useState } from "react";
import { MenuItem, TextField, Box, Grid, Tooltip, Typography, Button, Stack, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { usePlocState } from "../../common/usePlocState";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import moment, { Moment } from "moment";
import { RangeDateRequest } from "../../../Domine/IRequest";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { ResumeProduct, ResumeSale, ResumeSellerResponse } from "../../../Domine/IResponse";
import LoadingSpinner from "../../ui/LoadingSpinner";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "darkslategray",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function SummaryGainSeller() {
  const [startDate, setStarDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(moment());

  const [useLoading, setLoading] = useState<boolean>(false);
  const sellerPloc = dependenciesLocator.provideSellerPloc();
  const sellerState = usePlocState(sellerPloc);

  async function handleChangeSeller(e: any) {
    const updatedValue = { [e.target.name]: e.target.value };
    sellerPloc.changeState({
      ...sellerState,
      ...updatedValue,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    if (endDate?.toISOString() === undefined || startDate?.date() === undefined || sellerState.sellerID === "") {
      return;
    }
    const rangeDate: RangeDateRequest = {
      end: endDate.toISOString(),
      start: startDate.toISOString(),
    };
    await sellerPloc.getOrderToPay(parseInt(sellerState.sellerID), rangeDate);
    setLoading(false);
  }

  useEffect(() => {
    const getListSeller = async () => {
      sellerPloc.resetState();
      await sellerPloc.getAllSeller();
    };
    getListSeller();
  }, []);

  function handleClose() {
    sellerPloc.hideModal();
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={1} justifyContent="flex-start">
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Fecha Inicial"
                name="start"
                value={startDate}
                onChange={(newValue) => setStarDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker label="Fecha Fin" name="end" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" spacing={3}>
              <TextField
                required
                size="medium"
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
              <Tooltip title="Consultar" placement="top">
                <Button type="submit" variant="contained" endIcon={<SendIcon />} color="error">
                  Consultar
                </Button>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 950 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Orden N°</StyledTableCell>
              <StyledTableCell align="right">Resume Cantidad/Producto</StyledTableCell>
              <StyledTableCell align="right">Referencia Pago</StyledTableCell>
              <StyledTableCell align="right">Fecha Pago</StyledTableCell>
              <StyledTableCell align="right">Total Orden</StyledTableCell>
              <StyledTableCell align="right">Total Reportado</StyledTableCell>
              <StyledTableCell align="right">Ganancia</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerState.summarySeller?.resume.map((row: ResumeSellerResponse) => (
              <StyledTableRow key={row.order_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableCell component="th" scope="row">
                  {row.order_id}
                </StyledTableCell>
                <TableCell align="right">
                  {row.products.map((product: ResumeProduct, index: number) => (
                    <div key={index}>
                      ({product.quantity}) {product.name}
                    </div>
                  ))}
                </TableCell>
                <TableCell align="right">
                  {row.sales.map((sale: ResumeSale, index: number) => (
                    <div key={index}>{sale.reference_payment}</div>
                  ))}
                </TableCell>
                <TableCell align="right">
                  {row.sales.map((sale: ResumeSale, index: number) => (
                    <div key={index}>{sale.date_sale}</div>
                  ))}
                </TableCell>
                <TableCell align="right">{row.total_order}</TableCell>
                <TableCell align="right">{row.total_reported}</TableCell>
                <TableCell align="right">{row.sales.map((sale) => sale.gain_seller).reduce((a, b) => a + b)}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="h6" align="right" className="animate__animated animate__fadeInUp" color={"greenyellow"}>
          Total a pagar :{" "}
          {"$" +
            (sellerState.summarySeller?.total_to_pay === undefined || sellerState.summarySeller?.total_to_pay == null
              ? 0
              : sellerState.summarySeller?.total_to_pay.toFixed(2))}
        </Typography>
      </TableContainer>
      <Snackbar open={sellerState.showModal} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {sellerState.messageModal}
        </Alert>
      </Snackbar>
      {useLoading ? <LoadingSpinner text={"Cargando..."} /> : ""}
    </>
  );
}
