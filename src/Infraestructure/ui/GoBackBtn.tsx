import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GoBackBtn() {
  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);

  return (
    <Button startIcon={<ArrowBackIcon />} onClick={handleReturn}>
      Volver
    </Button>
  );
}
