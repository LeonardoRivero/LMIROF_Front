// import { useParams } from 'react-router-dom';

// import LoadingSpinner from "../ui/LoadingSpinner";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { ItemDTO } from "../../Domine/DTOS";
import { dependenciesLocator } from "../common/DependenciesLocator";
import { usePlocState } from "../common/usePlocState";

export default function Index() {
  // const [items, setItems] = useState(null);
  // const [loading, setLoading] = useState(false);
  const ploc = dependenciesLocator.provideProductPloc();
  const state = usePlocState(ploc);

  const { term } = useParams();
  const navigate = useNavigate();
  const handleNavigation = (id: number) => navigate(`/item/${id}`);

  useEffect(() => {
    const getAllProducts = async () => {
      await ploc.getAllProducts();
      try {
        const items = ploc.state.listItems;
        if (term) {
          const filteredItems = items.filter((item) => item.title.toLowerCase().includes(term.trim().toLowerCase()));
          ploc.changeState({ ...state, listItems: filteredItems });
        } else {
          ploc.changeState({ ...state, listItems: items });
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAllProducts();
  }, [term]);

  return (
    <>
      <Typography variant="h5">Products LMirof</Typography>
      <hr />
      <Grid container spacing={4} py={3}>
        {state.listItems.map((item: ItemDTO) => (
          <Grid item xs={12} sm={6} lg={3} key={item.id}>
            <Card className="animate__animated animate__fadeIn" raised>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="260"
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
              <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button size="small" color="error" onClick={() => handleNavigation(item.id)}>
                  Ver más
                </Button>
                <Typography variant="subtitle2" color="text.secondary" align="right">
                  {`$${item.price}`}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
