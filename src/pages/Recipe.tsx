import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRecipe, useFetchRecipeById } from "../api/recipes";
import RecipeLayout from "../components/templates/RecipeLayout";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { ROUTES } from "../constants/Routes";
import { useAppDispatch } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";
import { useTranslation } from "react-i18next";
import { useDeleteImage } from "../api/file";
import { FirebaseError } from "firebase/app";
import { DEFAULT_IMAGE } from "../constants/DefaultValues";

const Recipe = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: recipeData, isLoading: recipeIsLoading } =
    useFetchRecipeById(id);
  const deleteRecipeMutation = useDeleteRecipe();
  const deleteImageMutation = useDeleteImage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      ) : recipeData && Object.keys(recipeData).length !== 0 ? (
        <RecipeLayout onDeleteRecipe={handleDeleteRecipe} recipe={recipeData} />
      ) : (
        <div>{t("recipe.notFound")}</div>
      )}
    </>
  );
};

export default Recipe;
