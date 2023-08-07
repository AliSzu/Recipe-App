import { UseMutationResult } from "@tanstack/react-query";
import { showSnackbar } from "../slices/snackbarSlice";
import { useAppDispatch } from "../store/store";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { useUploadImage } from "../api/file";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";

export const useSubmitWithFile = (
  submitMutation: UseMutationResult<string | void, FirebaseError, Recipe>
) => {
  const uploadImageMutation = useUploadImage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    successCode: string,
  ) => {
    uploadImageMutation.mutate(image, {
      onSuccess: (url) => {
        submitMutation.mutate(
          { ...recipe, imgSrc: url },
          {
            onSuccess: (id) => {
              dispatch(
                showSnackbar({
                  message: successCode,
                  severity: "success",
                  autoHideDuration: 6000,
                })
              );
              navigate(`${ROUTES.RECIPE}/${id}`)
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
