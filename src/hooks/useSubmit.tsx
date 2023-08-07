import { UseMutationResult } from "@tanstack/react-query";
import { showSnackbar } from "../slices/snackbarSlice";
import { useAppDispatch } from "../store/store";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";

export const useSubmit = (
  submitMutation: UseMutationResult<void, FirebaseError, Recipe>
) => {
  const dispatch = useAppDispatch();
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
    successCode: string
  ) => {
    submitMutation.mutate(recipe, {
      onSuccess: () => {
        dispatch(
          showSnackbar({
            message: successCode,
            severity: "success",
            autoHideDuration: 6000,
          })
        );
      },
      onError: (error) => {
        dispatchError(error.code);
      },
    });
  };

  return { submitToFirebase, isLoading };
};
