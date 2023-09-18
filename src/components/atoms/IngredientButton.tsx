import { IconButton, styled } from "@mui/material";
import { Ingredient } from "../../types/RecipeTypes";
import {
  useAddItemToShoppingList,
  useDeleteShoppingListItem,
  useFetchShoppingListItem,
} from "../../api/shoppingList";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../store/store";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/QueryKeys";

interface IngredientButtonProps {
  ingredient: Ingredient;
  userUid: string;
}

const StyledIconButton = styled(IconButton)({
  color: "black",
});

const IngredientButton = ({ ingredient, userUid }: IngredientButtonProps) => {
  const [isPresent, setIsPresent] = useState<boolean>(false);
  const [docId, setDocId] = useState<string>();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data } = useFetchShoppingListItem(userUid, ingredient.id);
  const { mutate: addIngredientMutate } = useAddItemToShoppingList();
  const { mutate: deleteIngredientMutate } = useDeleteShoppingListItem();

  useEffect(() => {
    if (data && data?.length > 0 && data[0].id === ingredient.id) {
      setIsPresent(true);
      setDocId(data[0].docId);
    } else {
      setIsPresent(false)
    }
  }, [data, ingredient.id]);

  const dispatchSuccess = (successMessage: string) => {
    dispatch(
      showSnackbar({
        message: successMessage,
        severity: "success",
        autoHideDuration: 6000,
      })
    );
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.shoppingListItem],
    });
  };

  const handleAddIngredient = () => {
    addIngredientMutate(
      { ...ingredient, owner: userUid, id: ingredient.id },
      {
        onSuccess: (docId: string) => {
          dispatchSuccess("ingredient-success");
          setDocId(docId);
        },
      }
    );
  };

  const handleDeleteIngredient = () => {
    if (!docId) return;
    deleteIngredientMutate(docId, {
      onSuccess: () => {
        dispatchSuccess("ingredient-delete-success");
      },
      onError: (error) => {
        dispatch(
          showSnackbar({
            message: error.code,
            autoHideDuration: 6000,
            severity: "error",
          })
        );
      },
    });
  };

  const handleClick = () => {
    isPresent ? handleDeleteIngredient() : handleAddIngredient();
  };

  return (
    <StyledIconButton onClick={handleClick}>
      {isPresent ? <RemoveIcon /> : <AddIcon />}
    </StyledIconButton>
  );
};

export default IngredientButton;
