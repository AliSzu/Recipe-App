import { UseMutationResult } from "@tanstack/react-query";
import { useDownloadUrl, useUploadImage } from "../api/recipes";
import { showSnackbar } from "../slices/snackbarSlice";
import { useAppDispatch } from "../store/store";
import { RecipeFormValues } from "../types/FormTypes";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";

export const useSubmitToFirebase = (
  submitMutation: UseMutationResult<void, FirebaseError, Recipe>
) => {
  const uploadImageMutation = useUploadImage();
  const getDownloadUrlMutation = useDownloadUrl();
  const dispatch = useAppDispatch();
  const isLoading =
    submitMutation.isLoading ||
    uploadImageMutation.isLoading ||
    getDownloadUrlMutation.isLoading;

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
    formData: RecipeFormValues,
    successCode: string
  ) => {
    const { image, ...formRecipe } = formData;

    uploadImageMutation.mutate(image[0], {
      onSuccess: (storageRef) => {
        getDownloadUrlMutation.mutate(storageRef, {
          onSuccess: (url) => {
            const recipe: Recipe = { ...formRecipe, imgSrc: url };
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
          },
          onError: (error) => {
            dispatchError(error.code);
          },
        });
      },
      onError: (error) => {
        dispatchError(error.code);
      },
    });
  };

  return { submitToFirebase, isLoading };
};
