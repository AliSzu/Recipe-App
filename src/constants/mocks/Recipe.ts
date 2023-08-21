import { Recipe } from "../../types/RecipeTypes";
import { uniqueId } from "../../utils/utils";

export const MOCK_RECIPE: Recipe = {
  title: "Pancakes",
  time: "50min",
  owner: '',
  imgSrc:
    "https://wszystkiegoslodkiego.pl/storage/images/202111/puszyste-pancakes.jpg",
  id: "mock1",
  ingredients: [
    {
      amount: "1/2",
      name: "cups all-purpose flour",
      id: "1",
    },
    {
      amount: "333",
      name: "teaspoons baking powder",
      id: "2",
    },
    {
      amount: "1/4",
      name: "teaspoon salt",
      id: "3",
    },
    {
      amount: "2",
      name: "tablespoons granulated sugar",
      id: "4",
    },
    {
      amount: "2",
      name: "cups milk",
      id: "5",
    },
    {
      amount: "1/4",
      name: "cup unsalted butter, melted",
      id: "6",
    },
    {
      amount: "1",
      name: "large egg",
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
