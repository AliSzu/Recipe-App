import { UseMutationResult } from "@tanstack/react-query";
import { showSnackbar } from "../slices/snackbarSlice";
import { useAppDispatch } from "../store/store";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";

export const useSubmit = (
  submitMutation: UseMutationResult<string | void, FirebaseError, Recipe>
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = submitMutation.isLoading;

  const dispatchError = (errorCode: string) => {
    dispatch(
      showSnackbar({
        message: errorCode,
        severity: "error",
        autoHideDuration: 6000,
      })
    );
  };

  const submitToFirebase = (
    recipe: Recipe,
    successCode: string,
  ) => {
    submitMutation.mutate(recipe, {
      onSuccess: (id) => {
        dispatch(
          showSnackbar({
            message: successCode,
            severity: "success",
            autoHideDuration: 6000,
          })
        );
        if (id) {
          navigate(`${ROUTES.RECIPE}/${id}`);
        } else {
          navigate(`${ROUTES.RECIPE}/${recipe.id}`);
        }
      },
      onError: (error) => {
        dispatchError(error.code);
      },
    });
  };

  return { submitToFirebase, isLoading };
};
