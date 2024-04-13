import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import { NotificationContext } from "./context/NotificationsContext";

export default function SimpleSnackbar() {
  const [context, setContext] = React.useContext(NotificationContext);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    let updatedContext = { ...context };
    updatedContext.show = false;
    setContext(updatedContext);
  };

  return (
    <div>
      <Snackbar open={context.show} autoHideDuration={3000} onClose={handleClose} message="Esto podria ser un alert" />
    </div>
  );
}
