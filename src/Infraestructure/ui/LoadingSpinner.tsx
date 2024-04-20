import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner({ text = "Cargando..." }: { text: string }) {
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
        <Typography variant="overline">{text}</Typography>
      </Box>
    </>
  );
}
