import { RecipeFormValues, ShoppingItemFormValues } from "../types/FormTypes";
import { uniqueId } from "../utils/recipeUtils";

function createEmptyFileList(): FileList {
  const files: File[] = [];
  return {
    item: () => null,
    ...files,
  };
}

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

export const shoppingItemDefaultValues: ShoppingItemFormValues = {
  name: "",
  amount: 1,
};
