import RecipeFormLayout from "../components/templates/RecipeFormLayout";
import { recipeDefaultValues } from "../constants/RecipeDefaultValues";

const AddRecipe = () => {
  return <RecipeFormLayout defaultValues={recipeDefaultValues} />;
};

export default AddRecipe;
