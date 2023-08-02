import { RecipeFormValues } from "../types/FormTypes";
import { createEmptyFileList, uniqueId } from "../utils/utils";

export const recipeDefaultValues: RecipeFormValues = {
  title: "",
  time: "",
  description: "",
  image: createEmptyFileList(),
  ingredients: [
    {
      amount: "",
      name: "",
      id: uniqueId(),
    },
  ],
  preparing: [{ step: "", id: uniqueId() }],
};
