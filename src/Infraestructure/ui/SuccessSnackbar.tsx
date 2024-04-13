import { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SuccessSnackbar({ message }: { message: string }) {
  const [open, setOpen] = useState(true);

  const handleClose = (_event: any) => {
    if (_event === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message || "Acción realizada correctamente"}
      </Alert>
    </Snackbar>
  );
}
