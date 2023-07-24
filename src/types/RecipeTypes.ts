export interface Recipe {
  id?: string;
  recipeId: string;
  title: string;
  time: string;
  imgSrc: string;
}
export interface Ingredient {
  amount: string,
  name: string
  id: string;
}
