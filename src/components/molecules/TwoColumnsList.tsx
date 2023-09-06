import { IconButton, List, ListItem, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";
import AddIcon from "@mui/icons-material/Add";
import { useAddItemToShoppingList } from "../../api/shoppingList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import { showSnackbar } from "../../slices/snackbarSlice";

interface TwoColumnListProps {
  items: Ingredient[];
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 0.5fr",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "space-between",
    gap: '2rem'
  },
}));

const StyledIconButton = styled(IconButton)({
  color: "black",
});

const NameWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: 'center',
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "initial",
  },
}));

const TwoColumnList = ({ items }: TwoColumnListProps) => {
  const { mutate: addIngredientMutate } = useAddItemToShoppingList();
  const userUid = useAppSelector(selectUserUid);
  const dispatch = useAppDispatch();

  const handleIngredientAdd = (ingredient: Ingredient) => {
    addIngredientMutate(
      { ...ingredient, owner: userUid, id: ingredient.id },
      {
        onSuccess: () => {
          dispatch(
            showSnackbar({
              message: "ingredient-success",
              severity: "success",
              autoHideDuration: 6000,
            })
          );
        },
      }
    );
  };
  return (
    <List>
      {items.map((item: Ingredient) => (
        <StyledListItem disableGutters={true} key={item.id}>
          <div>{item.amount}</div>
          <NameWrapper>
            {item.name}
            <StyledIconButton onClick={() => handleIngredientAdd(item)}>
              <AddIcon />
            </StyledIconButton>
          </NameWrapper>
        </StyledListItem>
      ))}
    </List>
  );
};

export default TwoColumnList;
