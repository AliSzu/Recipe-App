import { Category } from "../../enums/Category";
import { Recipe } from "../../types/RecipeTypes";
import { uniqueId } from "../../utils/utils";

export const MOCK_RECIPE: Recipe = {
  title: "Pancakes",
  time: 60,
  imgSrc:
    "https://wszystkiegoslodkiego.pl/storage/images/202111/puszyste-pancakes.jpg",
  id: "mock1",
  owner: "",
  category: Category.vegan,
  ingredients: [
    {
      amount: 1,
      name: "all-purpose flour",
      unit: "cups",
      id: "1",
    },
    {
      amount: 2,
      name: "baking powder",
      unit: "teaspoons",
      id: "2",
    },
    {
      amount: 3,
      name: "salt",
      unit: "teaspoon",
      id: "3",
    },
    {
      amount: 2,
      name: "granulated sugar",
      unit: "tablespoons",
      id: "4",
    },
    {
      amount: 2,
      name: "milk",
      unit: "cups",
      id: "5",
    },
    {
      amount: 123,
      name: "unsalted butter, melted",
      unit: "cup",
      id: "6",
    },
    {
      amount: 123,
      name: "egg",
      unit: "large",
      id: "7",
    },
  ],
  preparing: [
    {
      step: "In a large mixing bowl, whisk together 1 1/2 cups all-purpose flour, 3 1/2 teaspoons baking powder, 1/4 teaspoon salt, and 2 tablespoons granulated sugar.",
      id: uniqueId()
    },
    {
      step: "In a large mixing bowl, whisk together 1 1/2 cups all-purpose flour, 3 1/2 teaspoons baking powder, 1/4 teaspoon salt, and 2 tablespoons granulated sugar.",
      id: uniqueId()
    },
    {
      step: "In a large mixing bowl, whisk together 1 1/2 cups all-purpose flour, 3 1/2 teaspoons baking powder, 1/4 teaspoon salt, and 2 tablespoons granulated sugar.",
      id: uniqueId()
    },
  ],
  description:
    "Pancakes are soft, fluffy breakfast treats made from a simple batter, cooked until golden-brown. They're perfect for stacking and customizing with delicious toppings like syrup and fresh fruits,offering a comforting and delightful morning indulgence.",
};
