import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRecipe, useFetchRecipeById } from "../api/recipes";
import RecipeLayout from "../components/templates/RecipeLayout";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { ROUTES } from "../constants/Routes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";
import { useTranslation } from "react-i18next";
import { useDeleteImage } from "../api/files";
import { FirebaseError } from "firebase/app";
import { DEFAULT_IMAGE } from "../constants/DefaultValues";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../enums/QueryKeys";
import { useFetchFavoriteById } from "../api/favorite";
import { selectUserUid } from "../slices/authSlice";

const Recipe = () => {
  const userUid = useAppSelector(selectUserUid);
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: recipeData, isLoading: recipeIsLoading } =
    useFetchRecipeById(id);
  const { data: favoriteData } = useFetchFavoriteById(userUid, recipeData?.id);
  const deleteRecipeMutation = useDeleteRecipe();
  const deleteImageMutation = useDeleteImage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const showErrorSnackbar = (errorCode: string) => {
    dispatch(
      showSnackbar({
        message: errorCode,
        severity: "error",
        autoHideDuration: 6000,
      })
    );
  };

  const showSuccessSnackbar = () => {
    navigate(ROUTES.HOME);
    dispatch(
      showSnackbar({
        message: "delete-success",
        severity: "success",
        autoHideDuration: 6000,
      })
    );
    queryClient.invalidateQueries({
      queryKey: [
        QueryKeys.recipesData,
        {
          sort: "updatedAt",
          direction: "desc",
        },
      ],
    });
  };

  const handleDeleteRecipe = async () => {
    if (!id) return;
    if (recipeData?.imgSrc && recipeData?.imgSrc !== DEFAULT_IMAGE) {
      const deleteRecipePromise = deleteRecipeMutation.mutateAsync(id);
      const deleteImagePromise = deleteImageMutation.mutateAsync(
        recipeData.imgSrc
      );
      try {
        await Promise.all([deleteImagePromise, deleteRecipePromise]);
        showSuccessSnackbar();
      } catch (error) {
        const errorResponse = error as FirebaseError;
        showErrorSnackbar(errorResponse.code);
      }
    } else {
      deleteRecipeMutation.mutate(id, {
        onSuccess: () => {
          showSuccessSnackbar();
        },
        onError: (error) => {
          showErrorSnackbar(error.code);
        },
      });
    }
  };
  return (
    <>
      {recipeIsLoading ? (
        <CenteredCircularProgress />
      ) : recipeData && favoriteData && Object.keys(recipeData).length !== 0 ? (
        <RecipeLayout onDeleteRecipe={handleDeleteRecipe} recipe={recipeData} favorite={favoriteData.length > 0} />
      ) : (
        <div>{t("recipe.notFound")}</div>
      )}
    </>
  );
};

export default Recipe;
