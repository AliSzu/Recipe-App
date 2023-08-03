import RecipeForm from "../components/organisms/RecipeForm";
import { recipeDefaultValues } from "../constants/DefaultValues";

const AddRecipe = () => {
  return <RecipeForm defaultValues={recipeDefaultValues} />;
};

export default AddRecipe;
