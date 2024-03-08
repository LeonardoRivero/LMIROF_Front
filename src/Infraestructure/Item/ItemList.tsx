import { ItemDTO } from "../../Domine/DTOS";
import Item from "./Item";

import Grid from "@mui/material/Grid";

export default function ItemList({ items }: { items: Array<ItemDTO> }) {
  return (
    <>
      <h2>{"Productos L'Mirof"}</h2>
      <hr />
      <Grid container spacing={4} py={3}>
        {items.map((item: ItemDTO) => (
          <Grid item xs={12} sm={6} lg={3} key={item.id}>
            <Item {...item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
