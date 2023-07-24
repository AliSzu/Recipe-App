import { List, ListItem, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";

interface TwoColumnListProps {
  items: Ingredient[];
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down('sm')] : {
    justifyContent: "flex-start",
    display: 'grid',
    gridTemplateColumns: '0.3fr 1fr',
  }
}));

const TwoColumnList = ({ items }: TwoColumnListProps) => {
  return (
    <List>
      {items.map((item: Ingredient) => (
        <StyledListItem disableGutters={true} key={item.name}>
          <div>{item.amount}</div>
          <div>{item.name}</div>
        </StyledListItem>
      ))}
    </List>
  );
};

export default TwoColumnList;
