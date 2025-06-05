import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { ItemDTO } from "../../Domine/DTOS";
import { usePlocState } from "../common/usePlocState";
import WhatsappButton from "../ui/WhatsappBtn";
import { useDependencies } from "../context/DependenciesProvider";

export default function Index() {
  const { provideProductPloc } = useDependencies();
  const ploc = provideProductPloc;
  const state = usePlocState(ploc);
  const navigate = useNavigate();
  const handleNavigation = (id: number) => navigate(`/item/${id}`);

  const { term } = useParams();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        if (term) {
          ploc.filterByTitle(state.listItems, term);
        } else {
          await ploc.getAllProducts();
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAllProducts();
  }, [term]);

  return (
    <>
      <Grid container spacing={2} py={2}>
        {state.listItems.map((item: ItemDTO) => (
          <Grid item xs={12} sm={6} lg={3} key={item.id}>
            <Card className="animate__animated animate__fadeIn" raised>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="350"
                  image={item.url}
                  alt={item.title}
                  onClick={() => handleNavigation(item.id)}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleNavigation(item.id)}
                >
                  Ver más
                </Button>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  align="right"
                >
                  {`$${item.price}`}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <WhatsappButton
        phoneNumber="573185744688"
        message="Hola, quiero más información sobre tus productos"
      />
    </>
  );
}
