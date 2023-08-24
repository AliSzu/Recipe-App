import { RecipeFormValues, ShoppingItemFormValues } from "../types/FormTypes";
import { uniqueId } from "../utils/utils";

export const DEFAULT_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/recipe-app-c8936.appspot.com/o/recipe%2FdefaultDish.jpeg?alt=media&token=724b6767-874e-42e6-aab5-3af18cb8b1af";

export const recipeDefaultValues: RecipeFormValues = {
  title: "",
  time: "",
  description: "",
  imgSrc: DEFAULT_IMAGE,
  ingredients: [
    {
      amount: "",
      name: "",
      id: uniqueId(),
    },
  ],
  preparing: [{ step: "", id: uniqueId() }],
};

export const shoppingItemDefaultValues: ShoppingItemFormValues = {
  name: "",
  owner: "",
  amount: 1,
};

export const DEBOUNCE_TIME = 800;
