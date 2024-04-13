import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { usePlocState } from "../../common/usePlocState";
import { dependenciesLocator } from "../../common/DependenciesLocator";

export default function ItemCount({ stock = 0, onAdd }: { stock: number; onAdd: (counter: number) => any }) {
  // const { counter, increment, decrement } = useCounter(initial);

  // const handleAddBtnClick = () => onAdd(counter);
  const ploc = dependenciesLocator.provideOrderPloc();
  const state = usePlocState(ploc);

  function increment() {
    ploc.incrementProduct(state.counterProduct);
  }

  function decrement() {
    ploc.decrementProduct(state.counterProduct);
  }

  function handleAddBtnClick() {
    onAdd(state.counterProduct);
  }
  return (
    <Box>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
        <FormControl
          sx={{
            m: 1,
            width: "11ch",
          }}
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end">unit</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            type="number"
            inputProps={{
              "aria-label": "weight",
              type: "number",
              value: stock > 0 && state.counterProduct,
              max: 10,
              min: 1,
              disabled: true,
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">
            {stock < 1 ? "Sin stock" : `En stock: ${stock}`}
          </FormHelperText>
        </FormControl>
        <Stack direction={{ xs: "row-reverse", sm: "column" }}>
          <IconButton
            aria-label="addButton"
            disabled={stock < 1 || (state.counterProduct === stock && true)}
            onClick={increment}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            aria-label="removeButtom"
            disabled={state.counterProduct < 1 || (stock < 1 && true)}
            onClick={decrement}
          >
            <RemoveIcon />
          </IconButton>
        </Stack>
      </Box>

      <Button
        aria-label="addToCart"
        variant="outlined"
        color="inherit"
        startIcon={<ShoppingCartIcon />}
        sx={{ mt: 1 }}
        onClick={handleAddBtnClick}
        disabled={stock < 1 || (state.counterProduct < 1 && true)}
      >
        Agregar
      </Button>
    </Box>
  );
}
