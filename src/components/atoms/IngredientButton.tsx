import { IconButton } from "@mui/material";
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
    }
  }, [data]);


  const dispatchSuccess = (successMessage: string) => {
    dispatch(
      showSnackbar({
        message: successMessage,
        severity: "success",
        autoHideDuration: 6000,
      })
    );
  };

  const handleAddIngredient = () => {
    addIngredientMutate(
      { ...ingredient, owner: userUid, id: ingredient.id },
      {
        onSuccess: (docId: string) => {
          dispatchSuccess("ingredient-success");
          queryClient.invalidateQueries({
            queryKey: [
              QueryKeys.shoppingListItem,
              { userUid: userUid, itemId: ingredient.id },
            ],
          });
          setDocId(docId);
          setIsPresent(true);
        },
      }
    );
  };

  const handleDeleteIngredient = () => {
    if (!docId) return;
    deleteIngredientMutate(docId, {
      onSuccess: () => {
        dispatchSuccess("ingredient-delete-success");
        queryClient.invalidateQueries({
          queryKey: [
            QueryKeys.shoppingListItem,
            { userUid: userUid, itemId: ingredient.id },
          ],
        });
        setIsPresent(false);
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
    <IconButton onClick={handleClick}>
      {isPresent ? (
        <RemoveIcon />
      ) : (
        <AddIcon />
      )}
    </IconButton>
  );
};

export default IngredientButton;
