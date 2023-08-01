import { usePostRecipe, useUploadImage } from "../api/recipes";
import RecipeForm from "../components/organisms/RecipeForm";
import { recipeDefaultValues } from "../constants/RecipeDefaultValues";
import { showSnackbar } from "../slices/snackbarSlice";
import { useAppDispatch } from "../store/store";
import { RecipeFormValues } from "../types/FormTypes";
import { Recipe } from "../types/RecipeTypes";

const AddRecipe = () => {
  const dispatch = useAppDispatch();

  const postRecipeMutation = usePostRecipe();
  const uploadImageMutation = useUploadImage();

  const handleFormSubmit = (formData: RecipeFormValues) => {
    const { image, ...formRecipe } = formData;
    uploadImageMutation.mutate(image[0], {
      onSuccess: (url) => {
        const recipe: Recipe = { ...formRecipe, imgSrc: url };
        postRecipeMutation.mutate(recipe, {
          onSuccess: () => {
            dispatch(
              showSnackbar({
                message: "post-success",
                severity: "success",
                autoHideDuration: 6000,
              })
            );
          },
        });
      },
      onError: (error) => {
        dispatch(
          showSnackbar({
            message: error.message,
            severity: "error",
            autoHideDuration: 6000,
          })
        );
      },
    });
  };

  return (
    <RecipeForm
      onFormSubmit={handleFormSubmit}
      defaultValues={recipeDefaultValues}
      isLoading={postRecipeMutation.isLoading || uploadImageMutation.isLoading}
    />
  );
};

export default AddRecipe;
