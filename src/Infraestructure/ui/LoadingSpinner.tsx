import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner({ text = "Cargando..." }: { text: string }) {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        <CircularProgress />
        <Typography variant="overline">{text}</Typography>
      </Box>
      ;
    </>
  );
}
