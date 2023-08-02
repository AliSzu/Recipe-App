export interface Recipe {
  id?: string;
  imgSrc: string;
  title: string;
  time: string;
  description: string;
  preparing: Preparing[];
  ingredients: Ingredient[];
}
export interface Ingredient {
  amount: string;
  name: string;
  id: string;
}

export interface Preparing {
  step: string;
  id: string;
}

export interface RecipeEdit {
  [key: string]: string | Preparing[] | Ingredient[];
  id: string;
}
