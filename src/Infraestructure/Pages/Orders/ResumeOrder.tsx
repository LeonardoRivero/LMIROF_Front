import { useEffect, useState } from "react";
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

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PendingOrder from "./PendingOrder";
import ClosedOrder from "./ClosedOrder";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function currentTab(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NewOrder() {
  // const navigate = useNavigate();
  const ploc = dependenciesLocator.provideOrderPloc();
  const state = usePlocState(ploc);

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="PENDIENTES" {...currentTab(0)} />
            <Tab label="CERRADAS" {...currentTab(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PendingOrder />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ClosedOrder />
        </CustomTabPanel>
      </Box>
    </>
  );
}
