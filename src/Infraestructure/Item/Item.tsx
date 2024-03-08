import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { ItemDTO } from "../../Domine/DTOS";

export default function Item(item: ItemDTO) {
  const imgPath = `../assets/${item.id}.jpg`;
  const navigate = useNavigate();
  const handleNavigation = () => navigate(`/item/${item.id}`);
  return (
    <Card className="animate__animated animate__fadeIn" raised>
      <CardActionArea>
        <CardMedia component="img" height="260" image={imgPath} alt={item.id} onClick={handleNavigation} />
        <CardContent>
          <Typography variant="body2" color="text.secondary" noWrap>
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button size="small" color="error" onClick={handleNavigation}>
          Ver más
        </Button>
        <Typography variant="subtitle2" color="text.secondary" align="right">
          {`$${item.price}`}
        </Typography>
      </CardActions>
    </Card>
  );
}
