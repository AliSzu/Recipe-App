import { List, ListItem, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";
import { useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import IngredientButton from "../atoms/IngredientButton";

interface TwoColumnListProps {
  items: Ingredient[];
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 0.5fr",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
  },
}));

const Wrapper = styled('div')({
  display: 'flex',
  gap: '1rem'
})

const NameWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "initial",
  },
}));

const TwoColumnList = ({ items }: TwoColumnListProps) => {
  const userUid = useAppSelector(selectUserUid);
  return (
    <List>
      {items.map((item: Ingredient) => (
        <StyledListItem disableGutters={true} key={item.id}>
          <Wrapper>
            <div>{item.amount}</div>
            <div>{item.unit}</div>
          </Wrapper>
          <NameWrapper>
            {item.name}
            <IngredientButton ingredient={item} userUid={userUid} />
          </NameWrapper>
        </StyledListItem>
      ))}
    </List>
  );
};

export default TwoColumnList;
