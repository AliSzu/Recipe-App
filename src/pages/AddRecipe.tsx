import { usePostRecipe } from "../api/recipes";
import RecipeForm from "../components/organisms/RecipeForm";
import { useSubmit } from "../hooks/useSubmit";
import { RecipeFormValues } from "../types/FormTypes";
import { useSubmitWithFile } from "../hooks/useSubmitWithFile";
import { recipeDefaultValues } from "../constants/DefaultValues";

const AddRecipe = () => {
  const postRecipeMutation = usePostRecipe();
  const { submitToFirebase: submitWithFile, isLoading: isLoadingWithFile } = useSubmitWithFile(postRecipeMutation);
  const { submitToFirebase: submitWithoutFile, isLoading: isLoadingWithoutFile } = useSubmit(postRecipeMutation);

  const handleFormSubmit = (formData: RecipeFormValues) => {
    const { image, ...formRecipe } = formData;
    if (image && image[0]) {
      submitWithFile(image[0], formRecipe, "post-success");
    } else {
      submitWithoutFile(formRecipe, "post-success");
    }
  };

  return (
    <RecipeForm
      onFormSubmit={handleFormSubmit}
      defaultValues={recipeDefaultValues}
      isLoading={isLoadingWithFile || isLoadingWithoutFile}
    />
  );
};

export default AddRecipe;
