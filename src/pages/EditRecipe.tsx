import { useParams } from "react-router-dom";
import { useEditRecipe, useFetchRecipeById } from "../api/recipes";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import RecipeForm from "../components/organisms/RecipeForm";
import { RecipeFormValues } from "../types/FormTypes";
import { useTranslation } from "react-i18next";
import { useSubmitWithFile } from "../hooks/useSubmitWithFile";
import { useSubmit } from "../hooks/useSubmit";
import { useAppSelector } from "../store/store";
import { selectUserUid } from "../slices/authSlice";

const EditRecipe = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const userUid = useAppSelector(selectUserUid)

  const { data: recipeData, isLoading: recipeIsLoading } =
    useFetchRecipeById(id);
  const editRecipeMutation = useEditRecipe();
  const { submitToFirebase: submitWithFile, isLoading: isLoadingWithFile } =
    useSubmitWithFile(editRecipeMutation);
  const {
    submitToFirebase: submitWithoutFile,
    isLoading: isLoadingWithoutFile,
  } = useSubmit(editRecipeMutation);

  const handleSubmit = (formData: RecipeFormValues) => {
    const { image, ...formRecipe } = formData;
    if (image && image[0]) {
      submitWithFile(image[0], {...formRecipe, owner: userUid }, "edit-success");
    } else {
      submitWithoutFile({...formRecipe, owner: userUid}, "edit-success");
    }
  };

  return (
    <>
      {recipeIsLoading ? (
        <CenteredCircularProgress />
      ) : recipeData && Object.keys(recipeData).length !== 0 ? (
        <RecipeForm
          defaultValues={{ ...recipeData }}
          onFormSubmit={handleSubmit}
          isLoading={isLoadingWithFile || isLoadingWithoutFile}
        />
      ) : (
        <div>{t("recipe.notFound")}</div>
      )}
    </>
  );
};

export default EditRecipe;
