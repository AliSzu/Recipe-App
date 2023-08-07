import { RecipeFormValues } from "../types/FormTypes";
import { uniqueId } from "../utils/utils";


export const recipeDefaultValues: RecipeFormValues = {
  title: "",
  time: "",
  description: "",
  imgSrc: import.meta.env.VITE_DEFAULT_DISH_URL,
  ingredients: [
    {
      amount: "",
      name: "",
      id: uniqueId(),
    },
  ],
  preparing: [{ step: "", id: uniqueId() }],
};
