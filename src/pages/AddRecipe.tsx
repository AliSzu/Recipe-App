import { usePostRecipe } from "../api/recipes";
import RecipeForm from "../components/organisms/RecipeForm";
import { useSubmit } from "../hooks/useSubmit";
import { RecipeFormValues } from "../types/FormTypes";
import { useSubmitWithFile } from "../hooks/useSubmitWithFile";
import { recipeDefaultValues } from "../constants/DefaultValues";
import { useAppSelector } from "../store/store";
import { selectUserUid } from "../slices/authSlice";
import { calculateMinutes } from "../utils/utils";

const AddRecipe = () => {
  const postRecipeMutation = usePostRecipe();
  const { submitToFirebase: submitWithFile, isLoading: isLoadingWithFile } =
    useSubmitWithFile(postRecipeMutation);
  const {
    submitToFirebase: submitWithoutFile,
    isLoading: isLoadingWithoutFile,
  } = useSubmit(postRecipeMutation);
  const userUid = useAppSelector(selectUserUid);

  const handleFormSubmit = (formData: RecipeFormValues) => {
    const { image, ...formRecipe } = formData;
    const timeInMinutes = calculateMinutes(
      formRecipe.time.hours,
      formRecipe.time.minutes
    );
    if (image && image[0]) {
      submitWithFile(
        image[0],
        { ...formRecipe, owner: userUid, time: timeInMinutes },
        "post-success"
      );
    } else {
      submitWithoutFile(
        { ...formRecipe, owner: userUid, time: timeInMinutes },
        "post-success"
      );
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
