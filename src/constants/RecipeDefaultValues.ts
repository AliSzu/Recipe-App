import { RecipeFormValues } from "../types/FormTypes";
import { uniqueId } from "../utils/recipeUtils";

export const recipeDefaultValues: RecipeFormValues = {
  title: "",
  time: "",
  description: "",
  ingredients: [
    {
      amount: "",
      name: "",
      id: uniqueId(),
    },
  ],
  preparing: [{ step: "", id: uniqueId() }],
};
