import { List, ListItem, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";

interface TwoColumnListProps {
  items: Ingredient[];
}

const StyledListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
});

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
