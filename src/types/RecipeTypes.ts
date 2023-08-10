import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface Recipe {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
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

export interface InfiniteRecipe {
  recipes: Recipe[];
  doc: QueryDocumentSnapshot<Recipe, DocumentData>;
}
