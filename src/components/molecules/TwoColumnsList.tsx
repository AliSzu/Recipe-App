import { IconButton, List, ListItem, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";
import AddIcon from "@mui/icons-material/Add";
import { useAddItemToShoppingList } from "../../api/shoppingList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/QueryKeys";

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
  const { mutate: addIngredientMutate } = useAddItemToShoppingList();
  const userUid = useAppSelector(selectUserUid);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

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
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.shoppingListData, { userUid: userUid }],
          });
        },
      }
    );
  };
  return (
    <List>
      {items.map((item: Ingredient) => (
        <StyledListItem disableGutters={true} key={item.id}>
          <div>{item.amount}</div>
          <div>
            {item.name}
            <IconButton onClick={() => handleIngredientAdd(item)}>
              <AddIcon />
            </IconButton>
          </div>
        </StyledListItem>
      ))}
    </List>
  );
};

export default TwoColumnList;
