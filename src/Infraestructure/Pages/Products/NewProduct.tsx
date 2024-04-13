import * as React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { usePlocState } from "../../common/usePlocState";
import { dependenciesLocator } from "../../common/DependenciesLocator";
import { NotificationContext } from "../../context/NotificationsContext";
import SimpleSnackbar from "../../Notifications";

const defaultTheme = createTheme();
// interface State extends SnackbarOrigin {
//   open: boolean;
// }
const NewProduct = () => {
  const navigate = useNavigate();
  const ploc = dependenciesLocator.provideProductPloc();
  const state = usePlocState(ploc);
  // const [states, setStates] = useState(state);
  // const [opener, setOpen] = useState<State>({
  //   open: false,
  //   vertical: "top",
  //   horizontal: "right",
  // });
  // const { vertical, horizontal, open } = opener;
  const [context, setContext] = useContext(NotificationContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      // let updatedContext = { ...context };
      // updatedContext.show = true;
      // setContext(updatedContext);
      await ploc.createProduct(state);
      // navigate("/");
    } catch (error) {
      // setOpen({ ...opener, open: false });
      console.log(error);
    }
  }

  async function handleChange(e: any) {
    const updatedValue = { [e.target.name]: e.target.value };
    // setState((states) => ({
    //   ...states,
    //   ...updatedValue,
    // }));

    ploc.changeState({
      ...state,
      ...updatedValue,
    });
  }

  // const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen({ ...opener, open: false });
  // };

  useEffect(() => {
    const getInitialData = async () => {
      await ploc.getInitialData();
    };
    getInitialData();
  }, []);

  return (
    // <ThemeProvider theme={defaultTheme}>
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
        <Typography component="h1" variant="h5">
          New Product
        </Typography>
        <SimpleSnackbar />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel>Provider</InputLabel>
              <Select
                fullWidth
                required
                value={state.provider}
                label="Foodsdsdsdsdsdsd"
                autoFocus
                name="provider"
                onChange={handleChange}
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
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                type="text"
                autoFocus
                onChange={(event) => handleChange(event)}
                value={state.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="reference"
                label="Reference"
                name="reference"
                autoFocus
                onChange={(event) => handleChange(event)}
                value={state.reference}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="salePrice"
                required
                fullWidth
                id="salePrice"
                label="Sale Price"
                type="text"
                autoFocus
                onChange={(event) => handleChange(event)}
                value={state.salePrice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gainBusiness"
                required
                fullWidth
                label="Gain Business"
                type="text"
                autoFocus
                onChange={(event) => handleChange(event)}
                value={state.gainBusiness}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gainOperational"
                required
                fullWidth
                label="Gain Operational"
                type="text"
                autoFocus
                onChange={(event) => handleChange(event)}
                value={state.gainOperational}
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
};
export default NewProduct;
// export default class NewProduct extends React.Component {
//   state: IProductState;
//   ploc: ProductsPloc;
//   constructor(props: any) {
//     super(props);
//     this.ploc = dependenciesLocator.provideProductPloc();
//     this.state = usePlocState(this.ploc);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     this.fetchData();
//   }

//   async handleChange(event: any) {
//     let { name: fieldName, value } = event.target;
//     this.setState({
//       [fieldName]: value,
//     });
//   }

//   handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const t = this.state;
//     console.log(t);
//     await this.ploc.createProduct(t);
//   };

//   async fetchData() {
//     try {
//       const response = await fetch("https://jsonplaceholder.typicode.com/photos");
//       const jsonData = await response.json();
//       console.log({ jsonData });
//       this.setState({ data: jsonData });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   render() {
//     return (
//       <ThemeProvider theme={defaultTheme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Typography component="h1" variant="h5" color={"black"}>
//               New Product{this.state.name}
//             </Typography>
//             <Box component="form" onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="given-name"
//                     name="name"
//                     required
//                     fullWidth
//                     id="name"
//                     label="Name"
//                     type="text"
//                     autoFocus
//                     // onChange={(e) => this.setState({ [e.target.name]: e.target.value })}
//                     onChange={this.handleChange}
//                     value={this.state.name}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="reference"
//                     label="Reference"
//                     name="reference"
//                     autoComplete="family-name"
//                     onChange={this.handleChange}
//                     value={this.state.reference}
//                   />
//                 </Grid>
//               </Grid>
//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 Creates
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </ThemeProvider>
//     );
//   }
// }
