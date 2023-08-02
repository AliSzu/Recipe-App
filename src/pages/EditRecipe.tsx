import { useNavigate, useParams } from "react-router-dom";
import { useEditRecipe, useFetchRecipeById } from "../api/recipes";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import RecipeForm from "../components/organisms/RecipeForm";
import { RecipeFormValues } from "../types/FormTypes";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../constants/Routes";
import { RecipeEdit } from "../types/RecipeTypes";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../slices/snackbarSlice";
import { createEmptyFileList } from "../utils/utils";

const EditRecipe = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: recipeData, isLoading: recipeIsLoading } =
    useFetchRecipeById(id);
  const editRecipeMutation = useEditRecipe();

  const handleSubmit = (formData: RecipeFormValues) => {
    const { image, ...formRecipe } = formData;
    if (!id) return
    const recipe: RecipeEdit = { ...formRecipe, id: id };
    editRecipeMutation.mutate(recipe, {
      onSuccess: () => {
        dispatch(
          showSnackbar({
            message: "edit-success",
            severity: "success",
            autoHideDuration: 6000,
          })
        );
        navigate(`${ROUTES.RECIPE}/${recipe.id}`);
      },
    });
  };

  return (
    <>
      {recipeIsLoading ? (
        <CenteredCircularProgress />
      ) : recipeData && Object.keys(recipeData).length !== 0 ? (
        <RecipeForm
          defaultValues={{ ...recipeData, image: createEmptyFileList() }}
          onFormSubmit={handleSubmit}
          isEditable={true}
        />
      ) : (
        <div>{t("recipe.notFound")}</div>
      )}
    </>
  );
};

export default EditRecipe;
