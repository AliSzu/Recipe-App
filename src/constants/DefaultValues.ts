import { Category } from "../enums/Category";
import { RecipeFormValues, ShoppingItemFormValues } from "../types/FormTypes";
import { uniqueId } from "../utils/utils";

export const DEFAULT_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/recipe-app-c8936.appspot.com/o/recipe%2FdefaultDish.jpeg?alt=media&token=724b6767-874e-42e6-aab5-3af18cb8b1af";

export const recipeDefaultValues: RecipeFormValues = {
  title: "",
  time: "",
  description: "",
  imgSrc: DEFAULT_IMAGE,
  category: Category.default,
  ingredients: [
    {
      amount: 1,
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
export const STALE_TIME = 1000 * 60 * 5; //5 minutes
export const CACHE_TIME = 1000 * 60 * 10; //10 minutes

export const MAX_LENGTH = {
  NAME: 30,
  TIME: 20,
  DESCRIPTION: 400,
  STEP: 100,
};

export const AMOUNT = {
  MIN: 0,
  MAX: 1000
}

export const FILE_MAX_SIZE = 1 * 1024 * 1024;
export const PREPARING_FIELDS_LIMIT = 50;
