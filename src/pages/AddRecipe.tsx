import { usePostRecipe } from "../api/recipes";
import RecipeForm from "../components/organisms/RecipeForm";
import { recipeDefaultValues } from "../constants/RecipeDefaultValues";
import { useSubmitToFirebase } from "../hooks/useSubmitToFirebase";
import { RecipeFormValues } from "../types/FormTypes";

const AddRecipe = () => {
  const postRecipeMutation = usePostRecipe();
  const { submitToFirebase, isLoading } = useSubmitToFirebase(postRecipeMutation);

  const handleFormSubmit = (formData: RecipeFormValues) => {
    submitToFirebase(formData, 'post-success');
  };

  return (
    <RecipeForm
      onFormSubmit={handleFormSubmit}
      defaultValues={recipeDefaultValues}
      isLoading={isLoading}
      isEditable={false}
    />
  );
};

export default AddRecipe;
