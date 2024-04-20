import { useEffect } from "react";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { usePlocState } from "../../common/usePlocState";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import PaidIcon from "@mui/icons-material/Paid";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import { OrderResponse, ProductResponseII } from "../../../Domine/IResponse";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import moment from "moment";
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

export default function PendingOrder() {
  const ploc = dependenciesLocator.provideOrderPloc();
  const state = usePlocState(ploc);
  const navigate = useNavigate();

  function handleAddPayment(orderId: number) {
    navigate(`/addpay/${orderId}`);
  }

  useEffect(() => {
    const getInitialData = async () => {
      console.log("object");
      // await ploc.getInitialData();
      await ploc.getListOrderPending();
    };
    getInitialData();
  }, []);

  return state.listOrdersPending.length > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 950 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Orden N°</StyledTableCell>
            <StyledTableCell align="right">Fecha</StyledTableCell>
            <StyledTableCell align="right">Nombre Vendedor</StyledTableCell>
            <StyledTableCell align="right">Resume Products</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.listOrdersPending.map((row: OrderResponse) => (
            <StyledTableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <TableCell align="right">{moment(row.date_created).toDate().toLocaleDateString()}</TableCell>
              <TableCell align="right">
                {row.seller.name} {row.seller.last_name}
              </TableCell>
              <TableCell align="right">
                {row.product.map((product: ProductResponseII) => (
                  <div key={product.id}>{product.name}</div>
                ))}
              </TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">
                <Tooltip title="Agregar Pago" placement="top">
                  <IconButton onClick={() => handleAddPayment(row.id)}>
                    <PaidIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <LoadingSpinner text={"Cargando..."} />
  );
}
