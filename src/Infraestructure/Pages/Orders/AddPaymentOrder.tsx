import { useEffect, useState } from "react";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { usePlocState } from "../../common/usePlocState";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { PaymentMethodResponse } from "../../../Domine/IResponse";
import { SwAlModalWithButtons, SwAlToast } from "../../utilities/NotificationsImpl";
import { useNavigate } from "react-router-dom";

export default function AddPaymentOrder() {
  const mediator = dependenciesLocator.providerMediator();
  const ploc = dependenciesLocator.provideOrderPloc();
  const plocSale = dependenciesLocator.provideSalePloc();
  const state = usePlocState(ploc);
  const { orderId } = useParams();
  const [allPaymentMethod, setAllPaymentMethod] = useState<Array<PaymentMethodResponse>>([]);
  const [checked, setChecked] = useState(true);
  const sweetModal = new SwAlModalWithButtons();
  const sweetToast = new SwAlToast();

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    ploc.changeState({ ...state, singlePayment: event.target.checked });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getInitialData = async () => {
      const listPaymentMethod = await mediator.getAllPaymentMethod();
      setAllPaymentMethod(listPaymentMethod);
      await plocSale.getSaleDetailByOrderID(orderId);
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
    if (orderId === undefined) {
      throw new Error("orderId is undefined");
    }

    try {
      const confirm = await sweetModal.show("Atencion", "Los datos ingresados son correctos?");
      if (confirm == false) return;
      await ploc.addPaymentToOrder(state, parseInt(orderId));
      sweetToast.setType("success");
      sweetToast.show("Excelente", "Pago registrado correctamente");
      navigate("/orders");
    } catch (error) {
      sweetToast.setType("error");
      sweetToast.show("Atencion", "Error al registrar el pago");
    }
  }

  return (
    <Container component="main" maxWidth="sm" className="animate__animated animate__fadeIn">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" gutterBottom>
          Nuevo Pago
          {JSON.stringify(state.singlePayment)}
        </Typography>
        <Box sx={{ m: "2rem" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Order N°" autoFocus value={orderId} variant="standard" disabled={true} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id="paymentMethod"
              select
              value={state.paymentMethod}
              label="Metodo de pago"
              name="paymentMethod"
              onChange={handleChange}
              defaultValue={""}
              variant="standard"
            >
              {allPaymentMethod.length === 0 ? (
                <MenuItem disabled value="">
                  <em>None</em>
                </MenuItem>
              ) : (
                allPaymentMethod.map((paymentMethod) => {
                  return (
                    <MenuItem key={paymentMethod.id} value={paymentMethod.id}>
                      {paymentMethod.description}
                    </MenuItem>
                  );
                })
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="referencePayment"
              required
              fullWidth
              label="Referencia de Pago"
              autoFocus
              value={state.referencePayment}
              onChange={handleChange}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="total"
              required
              fullWidth
              label="Valor pago"
              autoFocus
              value={state.total}
              onChange={handleChange}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckbox}
                  name="singlePayment"
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Pago Contado"
              labelPlacement="end"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirmar
        </Button>
      </Box>
    </Container>
  );
}
