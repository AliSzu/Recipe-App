import { UseMutationResult } from "@tanstack/react-query";
import { showSnackbar } from "../slices/snackbarSlice";
import { useAppDispatch } from "../store/store";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { useUploadImage } from "../api/file";

export const useSubmitWithFile = (
  submitMutation: UseMutationResult<void, FirebaseError, Recipe>
) => {
  const uploadImageMutation = useUploadImage();
  const dispatch = useAppDispatch();
  const isLoading = submitMutation.isLoading || uploadImageMutation.isLoading;

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
    image: File,
    recipe: Recipe,
    successCode: string
  ) => {
    uploadImageMutation.mutate(image, {
      onSuccess: (url) => {
        submitMutation.mutate(
          { ...recipe, imgSrc: url },
          {
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
          }
        );
      },
      onError: (error) => {
        dispatchError(error.code);
      },
    });
  };

  return { submitToFirebase, isLoading };
};
