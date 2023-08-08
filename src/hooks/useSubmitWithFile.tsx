import { UseMutationResult } from "@tanstack/react-query";
import { showSnackbar } from "../slices/snackbarSlice";
import { useAppDispatch } from "../store/store";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { useDeleteImage, useUploadImage } from "../api/file";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/Routes";
import { DEFAULT_IMAGE } from "../constants/RecipeDefaultValues";

export const useSubmitWithFile = (
  submitMutation: UseMutationResult<string | void, FirebaseError, Recipe>
) => {
  const uploadImageMutation = useUploadImage();
  const deleteImageMutation = useDeleteImage();
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

  const dispatchSuccess = (successCode: string, id?: string) => {
    dispatch(
      showSnackbar({
        message: successCode,
        severity: "success",
        autoHideDuration: 6000,
      })
    );
    id && navigate(`${ROUTES.RECIPE}/${id}`);
  };

  const submitToFirebase = (
    image: File,
    recipe: Recipe,
    successCode: string
  ) => {
    uploadImageMutation.mutate(image, {
      onSuccess: async (url) => {
        if (recipe.imgSrc === DEFAULT_IMAGE) {
          submitMutation.mutate(
            { ...recipe, imgSrc: url },
            {
              onSuccess: (id) => {
                const navigateId = id ? id : recipe.id
                dispatchSuccess(successCode, navigateId)
              },
              onError: (error) => {
                dispatchError(error.code);
              },
            }
          );
        } else {
          const submitPromise = submitMutation.mutateAsync({
            ...recipe,
            imgSrc: url,
          });
          const deleteImagePromise = deleteImageMutation.mutateAsync(
            recipe.imgSrc
          );
          try {
            await Promise.all([submitPromise, deleteImagePromise]);
            dispatchSuccess(successCode, recipe.id)
          } catch (error) {
            const errorResponse = error as FirebaseError;
            dispatchError(errorResponse.code);
          }
        }
      },
      onError: (error) => {
        dispatchError(error.code);
      },
    });
  };

  return { submitToFirebase, isLoading };
};
