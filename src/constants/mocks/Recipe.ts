import { Recipe } from "../../types/RecipeTypes";

export const MOCK_RECIPE: Recipe = {
  title: "Pancakes",
  time: "50min",
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
    "In a large mixing bowl, whisk together 1 1/2 cups all-purpose flour, 3 1/2 teaspoons baking powder, 1/4 teaspoon salt, and 2 tablespoons granulated sugar.",
    "In a separate bowl, whisk 1 1/4 cups milk, 1/4 cup melted unsalted butter, and 1 large egg.",
    "Pour the wet ingredients into the dry ingredients and stir until just combined. It's okay if there are some lumps; overmixing can result in tough pancakes.",
    "Preheat a non-stick skillet or griddle over medium heat. Lightly grease the surface with butter or cooking spray.",
    "Pour 1/4 cup of batter onto the skillet for each pancake. Cook until bubbles form on the surface, then flip and cook the other side until golden brown.",
    "Transfer the cooked pancakes to a plate and keep warm while cooking the remaining batter.",
    "Serve the pancakes warm with your favorite toppings such as maple syrup, fresh berries, or whipped cream.",
    "Enjoy your delicious homemade pancakes!",
  ],
  description:
    "Pancakes are soft, fluffy breakfast treats made from a simple batter, cooked until golden-brown. They're perfect for stacking and customizing with delicious toppings like syrup and fresh fruits,offering a comforting and delightful morning indulgence.",
};
