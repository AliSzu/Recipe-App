export interface Recipe {
  id?: string;
  recipeId: string;
  title: string;
  time: string;
  imgSrc: string;
  description?: string;
  ingredients?: Ingredient[];
  preparing?: string[];
}
export interface Ingredient {
  amount: string;
  name: string;
}
