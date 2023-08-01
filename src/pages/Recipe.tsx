import { useNavigate, useParams } from "react-router-dom";
import { useDeleteRecipe, useFetchRecipeById } from "../api/recipes";
import RecipeLayout from "../components/templates/RecipeLayout";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { ROUTES } from "../constants/Routes";
import { useAppDispatch } from "../store/store";
import { showSnackbar } from "../slices/snackbarSlice";
import { useTranslation } from "react-i18next";

const Recipe = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: recipeData, isLoading: recipeIsLoading } =
    useFetchRecipeById(id);
  const deleteRecipeMutation = useDeleteRecipe();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteRecipe = (recipeId: string) => {
    deleteRecipeMutation.mutate(recipeId, {
      onSuccess: () => {
        dispatch(
          showSnackbar({
            message: "delete-success",
            severity: "success",
            autoHideDuration: 6000,
          })
        );
        navigate(ROUTES.HOME);
      },
      onError: (error) => {
        dispatch(
          showSnackbar({
            message: error.code,
            severity: "error",
            autoHideDuration: 6000,
          })
        );
      },
    });
  };
  return (
    <>
      {recipeIsLoading ? (
        <CenteredCircularProgress />
      ) : recipeData && Object.keys(recipeData).length !== 0 ? (
        <RecipeLayout onDeleteRecipe={handleDeleteRecipe} recipe={recipeData} />
      ) : (
        <div>{t('recipe.notFound')}</div>
      )}
    </>
  );
};

export default Recipe;
