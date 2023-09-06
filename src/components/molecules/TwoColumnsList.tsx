import { List, ListItem, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";
import { useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import IngredientButton from "../atoms/IngredientButton";

interface TwoColumnListProps {
  items: Ingredient[];
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    display: "grid",
    gridTemplateColumns: "0.3fr 1fr",
  },
}));

const TwoColumnList = ({ items }: TwoColumnListProps) => {
  const userUid = useAppSelector(selectUserUid);

  return (
    <List>
      {items.map((item: Ingredient) => (
        <StyledListItem disableGutters={true} key={item.id}>
          <div>{item.amount}</div>
          <div>
            {item.name}
            <IngredientButton ingredient={item} userUid={userUid}/>
          </div>
        </StyledListItem>
      ))}
    </List>
  );
};

export default TwoColumnList;
